// Credentials({
//   name: "OAuth2 Credentials",
//   credentials: {
//     accessToken: {},
//     refreshToken: {},
//   },
//   authorize: async (credentials) => {
//     try {
//       const { accessToken, refreshToken } = credentials;
//       console.log("ACCESS TOKEN", accessToken);
//       console.log("REFRESH TOKEN", refreshToken);

//       const userRes = await fetch(`${API_URL}api/users/me`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!userRes.ok) throw new Error("Invalid credentials");
//       const user = await userRes.json();

//       return {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         slug: user.slug,
//         plan: user.plan,
//         is_active: user.is_active,
//         is_staff: user.is_staff,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       };
//     } catch (error) {
//       console.error(`Something went wrong: ${error}`);
//       return null;
//     }
//   },
// }),
