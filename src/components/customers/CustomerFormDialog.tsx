
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Customer } from '@/types';

type CustomerFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (customer: Customer) => void;
  customer?: Customer;
};

// Generate a random customer ID
const generateCustomerId = () => {
  return `CUST${String(Math.floor(Math.random() * 900) + 100)}`;
};

// Generate a random loan ID
const generateLoanId = () => {
  return `LOAN${String(Math.floor(Math.random() * 900) + 100)}`;
};

// Generate random business rating
const generateBusinessRating = () => {
  const ratings = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D'];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

export default function CustomerFormDialog({
  open,
  onOpenChange,
  onSubmit,
  customer,
}: CustomerFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    loanId: '',
    businessRating: '',
    status: 'Active',
    createdAt: '',
  });
  
  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        id: generateCustomerId(),
        name: '',
        email: '',
        phone: '',
        address: '',
        loanId: generateLoanId(),
        businessRating: generateBusinessRating(),
        status: 'Active',
        createdAt: new Date().toISOString(),
      });
    }
  }, [customer, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Customer);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{customer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Customer ID</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanId">Loan ID</Label>
              <Input
                id="loanId"
                name="loanId"
                value={formData.loanId}
                onChange={handleChange}
                disabled={!!customer}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessRating">Business Rating</Label>
              <Input
                id="businessRating"
                name="businessRating"
                value={formData.businessRating}
                onChange={handleChange}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as 'Active' | 'Inactive' })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-nh-green hover:bg-nh-green-dark">
              {customer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
