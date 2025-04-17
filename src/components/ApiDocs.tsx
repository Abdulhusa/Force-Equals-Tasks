
const ApiDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">API Documentation</h2>
      <p className="text-gray-600">
        This document outlines the endpoints available in the Target Account Matching API.
        All endpoints return JSON responses and require authentication via JWT token.
      </p>
      
      {/* Login Endpoint */}
      <div>
        <h3 className="text-lg font-medium text-blue-700">POST /login</h3>
        <div className="mt-2 bg-gray-50 p-4 rounded-md">
          <p className="font-medium">Authentication endpoint</p>
          <p className="text-sm text-gray-600 mt-1">
            Authenticates a user and returns a JWT token for accessing protected endpoints.
          </p>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Request Body:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "username": "string",
  "password": "string"
}`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (200 OK):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "token": "jwt-token-string"
}`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (401 Unauthorized):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "error": "Invalid credentials"
}`}
            </pre>
          </div>
        </div>
      </div>
      
      {/* Get Accounts Endpoint */}
      <div>
        <h3 className="text-lg font-medium text-blue-700">GET /accounts</h3>
        <div className="mt-2 bg-gray-50 p-4 rounded-md">
          <p className="font-medium">Retrieve all accounts</p>
          <p className="text-sm text-gray-600 mt-1">
            Returns a list of all companies with their match scores and current status.
          </p>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Headers:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`Authorization: Bearer <jwt-token>`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (200 OK):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`[
  {
    "id": 1,
    "name": "Company Name",
    "matchScore": 85,
    "status": "Target"
  },
  ...
]`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (401 Unauthorized):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "error": "Access denied. No token provided."
}`}
            </pre>
          </div>
        </div>
      </div>
      
      {/* Update Account Status Endpoint */}
      <div>
        <h3 className="text-lg font-medium text-blue-700">POST /accounts/:id/status</h3>
        <div className="mt-2 bg-gray-50 p-4 rounded-md">
          <p className="font-medium">Update account target status</p>
          <p className="text-sm text-gray-600 mt-1">
            Updates the target status of a specific company account.
          </p>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Headers:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`Authorization: Bearer <jwt-token>`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">URL Parameters:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`id: number (account ID)`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Request Body:</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "status": "Target" | "Not Target"
}`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (200 OK):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "id": 1,
  "name": "Company Name",
  "matchScore": 85,
  "status": "Target"
}`}
            </pre>
          </div>
          
          <div className="mt-3">
            <p className="text-sm font-medium">Response (404 Not Found):</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`{
  "error": "Account not found"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
