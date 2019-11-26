export const getPackagesResponse = async (request) => {
  const packages = [ { name: "elso offer" } ]
  const status = 200
  return [ status, packages ]
}
