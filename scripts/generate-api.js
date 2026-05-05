const { generateApi } = require("swagger-typescript-api")
const path = require("path")
const fs = require("fs")
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.development") })

const swaggerUrl = process.env.VITE_SWAGGER_URL || "http://localhost:7000/swagger/v1/swagger.json"

/* NOTE: Make sure your backend authentication is either disabled for local dev, or you handle it here if needed.
   Usually for generating types, no auth is needed if the swagger.json is public. */

generateApi({
  name: "api.ts",
  output: path.resolve(process.cwd(), "./src/api/generated"),
  url: swaggerUrl,
  httpClientType: "axios",
  defaultResponseAsSuccess: false,
  generateClient: true,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: false,
  extractRequestBody: false,
  prettier: {
    printWidth: 120,
    tabWidth: 4,
    trailingComma: "none",
    parser: "typescript"
  },
  defaultResponseType: "any",
  singleHttpClient: true,
  cleanOutput: true,
  enumNamesAsValues: false,
  moduleNameFirstTag: true,
  generateUnionEnums: false,
  extraTemplates: [],
  hooks: {
    onCreateComponent: (component) => {
      // You can customize component generation here
      return component
    },
    onCreateRequestParams: (rawType) => {
      // You can customize request params here
      return rawType
    },
    onCreateRoute: (routeData) => {
      // You can customize route generation here
      return routeData
    },
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {
      // Priority 1: Use OperationId if available
      if (rawRouteInfo.operationId)
        return {
          ...routeNameInfo,
          usage: rawRouteInfo.operationId,
          original: rawRouteInfo.operationId
        }

      // Priority 2: Custom naming - Strip standard suffixes and append HTTP Method
      const method = rawRouteInfo.method.toLowerCase()
      const methodSuffix = method.charAt(0).toUpperCase() + method.slice(1) // "Get", "Post"

      // Suffixes that we want to remove because we will append the HTTP method instead.
      // Note: We KEEP 'Detail' to distinguish GET /resource from GET /resource/{id} in some cases,
      // but if we append Verb, maybe we don't need Detail? Let's keep it safe.
      const suffixesToRemove = ["Create", "List", "Update", "Delete"]

      let baseName = routeNameInfo.original
      const routeParts = rawRouteInfo.route.split("/").filter((p) => !!p)
      const lastPathPart = routeParts[routeParts.length - 1].replace(/[{}]/g, "")

      for (const suffix of suffixesToRemove) {
        if (baseName.endsWith(suffix) && baseName !== suffix) {
          // Safety check: don't strip if the path itself is the suffix
          if (lastPathPart.toLowerCase() !== suffix.toLowerCase()) {
            baseName = baseName.slice(0, -suffix.length)
            break
          }
        }
      }

      // Append Method Suffix
      // e.g. users -> usersGet
      if (!baseName.toLowerCase().endsWith(methodSuffix.toLowerCase())) {
        baseName += methodSuffix
      }

      return { ...routeNameInfo, usage: baseName, original: baseName }
    }
  }
})
  .then(() => {
    // files.forEach(({ content, name }) => {
    //   fs.writeFileSync(path.resolve(process.cwd(), './src/api/generated', name), content);
    // });

    // Post-processing: Patch Api.ts to return Promise<T> instead of Promise<AxiosResponse<T>>
    // because the custom axios interceptor already unwraps the response.
    const apiFilePath = path.resolve(process.cwd(), "./src/api/generated/Api.ts")
    if (fs.existsSync(apiFilePath)) {
      let content = fs.readFileSync(apiFilePath, "utf8")

      // Add import for ApiResponse

      // Replace return type in HttpClient.request to Promise<ApiResponse<T>>
      // Note: swagger-typescript-api generates Promise<AxiosResponse<T>> by default
      content = content.replace(/: Promise<AxiosResponse<T>>/g, ": Promise<ApiResponse<T>>")

      // Save
      fs.writeFileSync(apiFilePath, content)
      console.log("Patched Api.ts to match custom axios interceptor (unwrapped data).")
    }

    console.log("API files generated successfully.")
  })
  .catch((e) => console.error(e))
