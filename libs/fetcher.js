const owner_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/owner_companies?ownerID=";
const company_baseURL =
  "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/company?companyID=";
const product_baseURL =
  "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product?productID=";
const plugin_baseURL =
  "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/product/sku";

export async function fetcher_Owner(ownerID) {
  const response = await fetch(owner_baseURL + ownerID);
  const data = await response.json();
  return data;
}

export async function fetcher_Company(companyID) {
  const response = await fetch(company_baseURL + companyID);
  const data = await response.json();
  return data;
}

export async function fetcher_AllCompanies(companyList) {
  const companyIDs = companyList.map((company) => company.companyID);
  var fullData = [];

  for (let i = 0; i < companyIDs.length; i++) {
    const response = await fetch(company_baseURL + companyIDs[i]);
    const data = await response.json();
    fullData.push(data);
  }

  return fullData;
}

export async function fetcher_Product(productID) {
  const response = await fetch(product_baseURL + productID);
  const data = await response.json();
  return data;
}

export async function fetcher_Plugin(apiData) {
  const response = await fetch(
    plugin_baseURL + "?sku=" + apiData[0] + "&companyID=" + apiData[1]
  );
  const data = await response.json();
  return data;
}
