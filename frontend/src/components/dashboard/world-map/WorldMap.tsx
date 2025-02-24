"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import worldGeoJSON from "geojson-world-map";

const countryData: Record<string, number> = {
  USA: 100,
  CAN: 80,
  BRA: 50,
  RUS: 90,
  CHN: 120,
  IND: 70,
  AUS: 60,
  MEX: 40,
  ARG: 30,
};

const colorScale = scaleLinear<string>()
  .domain([0, 120])
  .range(["#D3E3FC", "#084298"]);

export const WorldMap = () => {
  return (
    <div className="w-full flex justify-center">
      <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 160 }}>
        <Geographies geography={worldGeoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const code: string = geo.properties.ISO_A3;
              const value = countryData[code] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(value)}
                  stroke="#FFF"
                  label={geo.properties.NAME}
                  className="transition-all hover:opacity-80"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};
