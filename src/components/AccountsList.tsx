
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Account } from "@/api/data";

interface AccountsListProps {
  token: string;
}

const AccountsList = ({ token }: AccountsListProps) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the API using the token
    // For demo purposes, we'll use the sample data
    const fetchAccounts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        const sampleAccounts: Account[] = [
          {
            id: 1,
            name: "Microsoft",
            matchScore: 85,
            status: "Target"
          },
          {
            id: 2,
            name: "Google",
            matchScore: 92,
            status: "Target"
          },
          {
            id: 3,
            name: "Amazon",
            matchScore: 78,
            status: "Not Target"
          },
          {
            id: 4,
            name: "Apple",
            matchScore: 88,
            status: "Target"
          },
          {
            id: 5,
            name: "Facebook",
            matchScore: 75,
            status: "Not Target"
          }
        ];
        
        setAccounts(sampleAccounts);
      } catch (error) {
        toast.error("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, [token]);

  const toggleAccountStatus = async (account: Account) => {
    try {
      const newStatus = account.status === "Target" ? "Not Target" : "Target";
      
      // In a real app, this would call the API to update the account status
      // For demo purposes, we'll just update the local state
      setAccounts(accounts.map(a => 
        a.id === account.id ? { ...a, status: newStatus } : a
      ));
      
      toast.success(`${account.name} status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update account status");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mb-2"></div>
        <p className="text-gray-600">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-gray-700 mb-4">Company Accounts ({accounts.length})</h3>
      
      <div className="space-y-4">
        {accounts.map(account => (
          <Card key={account.id} className="p-4 border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{account.name}</h4>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-600">Match Score: </span>
                  <div className="ml-2 bg-gray-200 h-2 w-24 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full`}
                      style={{ width: `${account.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{account.matchScore}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={
                  account.status === "Target" 
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-red-50 text-red-700 hover:bg-red-100"
                }>
                  {account.status}
                </Badge>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleAccountStatus(account)}
                >
                  {account.status === "Target" ? "Remove Target" : "Make Target"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
