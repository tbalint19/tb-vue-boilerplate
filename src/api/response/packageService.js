export const getPackagesResponse = async (request) => {
  const packages = [ { name: "a" }, { name: "b" } ]
  const status = 200
  return [ status, { packages } ]
}
