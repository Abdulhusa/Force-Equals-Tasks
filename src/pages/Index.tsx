
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AccountsList from "@/components/AccountsList";
import LoginForm from "@/components/LoginForm";
import ApiDocs from "@/components/ApiDocs";

const Index = () => {
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("demo");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-600">Force Equals Hiring Challenge</h1>
          <p className="text-gray-600 mt-2">Target Account Matching API & LinkedIn Profile Enhancer Widget</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - API demonstration */}
          <div className="w-full md:w-2/3">
            <Card className="shadow-md p-6">
              <div className="flex border-b mb-6">
                <button 
                  className={`px-4 py-2 ${activeTab === 'demo' ? 'border-b-2 border-blue-600 font-medium text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('demo')}
                >
                  API Demo
                </button>
                <button 
                  className={`px-4 py-2 ${activeTab === 'docs' ? 'border-b-2 border-blue-600 font-medium text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('docs')}
                >
                  API Documentation
                </button>
              </div>

              {activeTab === 'demo' ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Target Account Matching API</h2>
                  
                  {!token ? (
                    <LoginForm onLogin={setToken} />
                  ) : (
                    <AccountsList token={token} />
                  )}
                </>
              ) : (
                <ApiDocs />
              )}
            </Card>
          </div>
          
          {/* Right column - Chrome extension info */}
          <div className="w-full md:w-1/3">
            <Card className="shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">LinkedIn Profile Enhancer Widget</h2>
              <p className="text-gray-600 mb-4">
                A Chrome extension that enhances LinkedIn company profiles with match scores and target status.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Widget Preview</h3>
                <div className="border rounded bg-white p-4 shadow-sm">
                  <div className="bg-blue-600 text-white p-2 rounded-t flex justify-between items-center">
                    <span className="font-medium">Force Equals Insights</span>
                    <span className="cursor-pointer">×</span>
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-lg mb-2">Microsoft</div>
                    <div className="text-sm text-gray-600 mb-1">Match Score: 85%</div>
                    <div className="h-2 bg-gray-200 rounded-full mb-3">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-end">
                      <span className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                        Target
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Download Chrome Extension</Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                This is a demo. In a real scenario, this would link to the Chrome Web Store.
              </p>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Force Equals Hiring Challenge Solution</p>
          <p className="text-gray-400 text-sm mt-1">Created for Full Stack Development Internship Application</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
