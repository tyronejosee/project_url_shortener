"use client";

import { Key, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  TableColumn as HeroUITableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@heroui/react";
import { ChevronDown, EllipsisVertical, Plus, Search } from "lucide-react";
import { capitalize } from "@/lib/utils";
import type {
  CellRendererProps,
  FilterOption,
  TableAction,
  TableColumn,
} from "@/types";

const HeroUITable = dynamic(
  () => import("@heroui/table").then((c) => c.Table),
  {
    ssr: false,
  },
);

export interface TableData {
  id?: string | number;
  uid?: string | number;
  [key: string]: unknown;
}

type Props<T extends TableData> = {
  data: T[];
  columns: TableColumn[];
  title?: string;
  serverSide?: boolean;
  totalItems?: number;
  loading?: boolean;
  onPageChange?: (page: number, rowsPerPage: number) => void;
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
  onSearchChange?: (searchValue: string) => void;
  onFilterChange?: (filterValue: Selection) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filterOptions?: FilterOption[];
  filterKey?: keyof T;
  filterLabel?: string;
  actions?: TableAction<T>[];
  selectable?: boolean;
  paginated?: boolean;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  sortable?: boolean;
  defaultSortColumn?: keyof T;
  defaultSortDirection?: "ascending" | "descending";
  columnToggle?: boolean;
  initialVisibleColumns?: string[];
  cellRenderer?: (props: CellRendererProps<T>) => React.ReactNode;
  statusColorMap?: Record<string, ChipProps["color"]>;
  statusKey?: keyof T;
  addButton?: { label: string; onAdd: () => void };
  maxHeight?: string;
  emptyContent?: string;
};

export default function Table<T extends TableData>({
  data,
  columns,
  title,
  serverSide = false,
  totalItems,
  loading = false,
  onPageChange,
  onSortChange: onSortChangeExternal,
  onSearchChange: onSearchChangeExternal,
  onFilterChange,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys = ["name" as keyof T],
  filterOptions = [],
  filterKey,
  filterLabel = "Filter",
  actions = [],
  selectable = true,
  paginated = true,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  sortable = true,
  defaultSortColumn,
  defaultSortDirection = "ascending",
  columnToggle = true,
  initialVisibleColumns,
  cellRenderer,
  statusColorMap = {},
  statusKey = "status" as keyof T,
  addButton,
  maxHeight = "600px",
  emptyContent = "No data found",
}: Props<T>) {
  // States
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(() => {
    const base =
      initialVisibleColumns ||
      columns.map((col: TableColumn) => col.uid as string);
    const uids = [...base];

    if (actions.length > 0 && !uids.includes("actions")) {
      uids.push("actions");
    }

    return new Set(uids);
  });
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    // @ts-expect-error - defaultSortColumn is not defined
    column: defaultSortColumn || columns[0]?.uid,
    direction: defaultSortDirection,
  });
  const [page, setPage] = useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  // Visible columns filter (server-side)
  const headerColumns = useMemo(() => {
    const cols = [...columns];

    if (actions.length > 0) {
      cols.push({ name: "ACTIONS", uid: "actions", align: "center" });
    }

    if (visibleColumns === "all") return cols;

    return cols.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns, columns, actions]);

  // Visible columns filter (client-side)
  const filteredItems = useMemo(() => {
    if (serverSide) return data;

    let filteredData = [...data];

    if (hasSearchFilter && searchable) {
      filteredData = filteredData.filter((item) =>
        searchKeys.some((key) =>
          item[key]
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
        ),
      );
    }

    if (
      filterKey &&
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== filterOptions.length
    ) {
      filteredData = filteredData.filter((item) => {
        const itemValue = item[filterKey as keyof T];
        return Array.from(statusFilter).includes(itemValue as string | number);
      });
    }

    return filteredData;
  }, [
    data,
    filterValue,
    statusFilter,
    searchKeys,
    filterKey,
    hasSearchFilter,
    searchable,
    filterOptions.length,
    serverSide,
  ]);

  // Pagination
  const pages = paginated
    ? (serverSide
        ? Math.ceil((totalItems || data.length) / rowsPerPage)
        : Math.ceil(filteredItems.length / rowsPerPage)) || 1
    : 1;

  const items = useMemo(() => {
    if (!paginated || serverSide) return data;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, paginated, serverSide, data]);

  // Sorting (client-side)
  const sortedItems = useMemo(() => {
    if (!sortable || serverSide) return items;

    return [...items].sort((a: T, b: T) => {
      const sortKey = sortDescriptor.column as keyof T;
      const first = a[sortKey];
      const second = b[sortKey];

      let cmp = 0;
      if (typeof first === "string" && typeof second === "string") {
        cmp = first.localeCompare(second);
      } else if (typeof first === "number" && typeof second === "number") {
        cmp = first < second ? -1 : first > second ? 1 : 0;
      } else {
        cmp = String(first).localeCompare(String(second));
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items, sortable, serverSide]);

  // Render cells
  const renderCell = useCallback(
    (item: T, columnKey: Key) => {
      const cellValue = item[columnKey as keyof T];

      if (cellRenderer && columnKey !== "actions") {
        return cellRenderer({
          item,
          columnKey: columnKey as string,
          value: cellValue,
        });
      }

      switch (columnKey) {
        case "actions":
          if (actions.length === 0) return null;

          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown
                classNames={{
                  content: "bg-white border-2 border-neutral-200 shadow-none",
                }}
              >
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <EllipsisVertical size={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {actions.map((action) => (
                    <DropdownItem
                      key={action.key}
                      color={action.color}
                      shortcut={action.shortcut}
                      startContent={action.icon}
                      onPress={() => action.onAction?.(item)}
                    >
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          const statusValue = item[statusKey];
          if (
            columnKey === statusKey &&
            statusColorMap[statusValue as string]
          ) {
            return (
              <Chip
                className="capitalize"
                color={statusColorMap[statusValue as string]}
                size="sm"
                variant="flat"
              >
                {statusValue as string}
              </Chip>
            );
          }

          return cellValue as React.ReactNode;
      }
    },
    [cellRenderer, actions, statusKey, statusColorMap],
  );

  // Event handlers with debounce for search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      const newPage = page + 1;
      setPage(newPage);
      if (serverSide && onPageChange) {
        onPageChange(newPage, rowsPerPage);
      }
    }
  }, [page, pages, serverSide, onPageChange, rowsPerPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      if (serverSide && onPageChange) {
        onPageChange(newPage, rowsPerPage);
      }
    }
  }, [page, serverSide, onPageChange, rowsPerPage]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = Number(e.target.value);
      setRowsPerPage(newRowsPerPage);
      setPage(1);
      if (serverSide && onPageChange) {
        onPageChange(1, newRowsPerPage);
      }
    },
    [serverSide, onPageChange],
  );

  const onSearchChange = useCallback(
    (value?: string) => {
      const searchValue = value || "";
      setFilterValue(searchValue);
      setPage(1);

      if (serverSide && onSearchChangeExternal) {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
          onSearchChangeExternal(searchValue);
        }, 500); // Wait 500ms
      }
    },
    [serverSide, onSearchChangeExternal],
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
    if (serverSide && onSearchChangeExternal) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      onSearchChangeExternal("");
    }
  }, [serverSide, onSearchChangeExternal]);

  // Handles
  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      setSortDescriptor(descriptor);
      if (serverSide && onSortChangeExternal) {
        onSortChangeExternal(descriptor);
      }
    },
    [serverSide, onSortChangeExternal],
  );

  const handleFilterChange = useCallback(
    (selection: Selection) => {
      setStatusFilter(selection);
      setPage(1);
      if (serverSide && onFilterChange) {
        onFilterChange(selection);
      }
    },
    [serverSide, onFilterChange],
  );

  // Effects
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Top content
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2 items-center">
          {searchable && (
            <Input
              isClearable
              size="sm"
              variant="bordered"
              className="w-full sm:max-w-[44%]"
              classNames={{
                inputWrapper:
                  "border-2 border-neutral-200 group-data-[focus=true]:border-neutral-200 shadow-none",
              }}
              placeholder={searchPlaceholder}
              startContent={<Search size={18} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          )}
          <div className="flex items-center gap-2">
            {filterOptions.length > 0 && filterKey && (
              <Dropdown
                classNames={{
                  content: "bg-white border-2 border-neutral-200",
                }}
              >
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    size="sm"
                    variant="bordered"
                    className="border-2 border-neutral-200"
                    endContent={<ChevronDown size={16} />}
                  >
                    {filterLabel}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Filter Options"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={handleFilterChange}
                >
                  {filterOptions.map((option) => (
                    <DropdownItem key={option.uid} className="capitalize">
                      {capitalize(option.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {columnToggle && (
              <Dropdown
                classNames={{
                  content: "bg-white border-2 border-neutral-200 shadow-none",
                }}
              >
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    size="sm"
                    variant="bordered"
                    endContent={<ChevronDown size={16} />}
                    className="border-2 border-neutral-200"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {addButton && (
              <Button
                size="sm"
                onPress={addButton.onAdd}
                endContent={<Plus size={18} />}
                className="bg-primary text-white font-medium"
              >
                {addButton.label}
              </Button>
            )}
          </div>
        </div>
        {(title || paginated) && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-500 text-small">
              {loading
                ? "Loading..."
                : title
                  ? `${title} (${
                      serverSide ? totalItems || data.length : data.length
                    } items)`
                  : `Total ${
                      serverSide ? totalItems || data.length : data.length
                    } items`}
            </span>
            {paginated && (
              <label className="flex items-center text-neutral-500 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-neutral-500 text-small"
                  onChange={onRowsPerPageChange}
                  value={rowsPerPage}
                >
                  {rowsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}
      </div>
    );
  }, [
    // Dependencies for test
    handleFilterChange,
    loading,
    onClear,
    serverSide,
    totalItems,
    // Dependencies for test
    searchable,
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    data.length,
    searchPlaceholder,
    filterOptions,
    filterKey,
    filterLabel,
    columnToggle,
    columns,
    addButton,
    title,
    paginated,
    rowsPerPage,
    rowsPerPageOptions,
  ]);

  // Button content
  const bottomContent = useMemo(() => {
    if (!paginated && !selectable) return null;

    return (
      <footer className="py-2 px-2 flex justify-between items-center">
        {selectable && (
          <span className="w-[30%] text-small text-neutral-500">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
        )}
        {paginated && (
          <Pagination
            showControls
            variant="light"
            page={page}
            total={pages}
            onChange={setPage}
            classNames={{
              item: "border-2 border-neutral-200",
              cursor: "pointer bg-primary text-white font-medium",
            }}
          />
        )}
        {paginated && (
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button
              size="sm"
              variant="bordered"
              isDisabled={pages === 1 || page === 1}
              onPress={onPreviousPage}
              className="border-2 border-neutral-200"
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="bordered"
              isDisabled={pages === 1 || page === pages}
              onPress={onNextPage}
              className="border-2 border-neutral-200"
            >
              Next
            </Button>
          </div>
        )}
      </footer>
    );
  }, [
    selectable,
    paginated,
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  // Table renderer
  return (
    <HeroUITable
      removeWrapper
      shadow="none"
      aria-label={`${title} Table`}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: `max-h-[${maxHeight}]` }}
      selectedKeys={selectable ? selectedKeys : undefined}
      selectionMode={selectable ? "multiple" : "none"}
      sortDescriptor={sortable ? sortDescriptor : undefined}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={selectable ? setSelectedKeys : undefined}
      onSortChange={sortable ? handleSortChange : undefined}
      className="border-2 border-neutral-200 rounded-xl p-4"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <HeroUITableColumn
            key={column.uid}
            align={column.align || "start"}
            allowsSorting={sortable && column.sortable}
          >
            {column.name.toUpperCase()}
          </HeroUITableColumn>
        )}
      </TableHeader>
      <TableBody
        items={sortedItems}
        isLoading={loading}
        emptyContent={emptyContent}
        loadingContent="Loading data..."
      >
        {(item) => (
          <TableRow key={item.id || item.uid || Math.random()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </HeroUITable>
  );
}
