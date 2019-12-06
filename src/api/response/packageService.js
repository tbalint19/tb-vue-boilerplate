export const getPackagesResponse = async (request) => {
  const packages = [ { title: "elso offer" } ]
  const status = 200
  return [ status, packages ]
}
