import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Student, CustomField, DrawerMode, StudentStatus } from '@/types';
import { useCustomFields } from '@/hooks/useCustomFields';
import { useAuth } from '@/context/AuthContext';

interface StudentDrawerProps {
  isOpen: boolean;
  mode: DrawerMode;
  student?: Student | null;
  onClose: () => void;
  onSave: (data: Partial<Student>) => void;
  onDelete?: (id: string) => void;
}

const defaultStudent: Partial<Student> = {
  name: '',
  email: '',
  phone: '',
  status: 'active',
};

export const StudentDrawer: React.FC<StudentDrawerProps> = ({
  isOpen,
  mode,
  student,
  onClose,
  onSave,
  onDelete,
}) => {
  const { customFields } = useCustomFields();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState<Partial<Student>>(defaultStudent);
  const [currentMode, setCurrentMode] = useState<DrawerMode>(mode);

  useEffect(() => {
    if (student && mode !== 'create') {
      setFormData(student);
    } else {
      setFormData(defaultStudent);
    }
    setCurrentMode(mode);
  }, [student, mode, isOpen]);

  const isReadOnly = currentMode === 'view' || !isAdmin;

  const handleChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderField = (field: CustomField) => {
    const value = formData[field.key];

    switch (field.type) {
      case 'text':
        return (
          <Input
            id={field.key}
            value={(value as string) || ''}
            onChange={e => handleChange(field.key, e.target.value)}
            disabled={isReadOnly}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={field.key}
            value={(value as string) || ''}
            onChange={e => handleChange(field.key, e.target.value)}
            disabled={isReadOnly}
            required={field.required}
            rows={3}
          />
        );
      case 'dropdown':
        return (
          <Select
            value={(value as string) || ''}
            onValueChange={v => handleChange(field.key, v)}
            disabled={isReadOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(opt => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.key}
              checked={!!value}
              onCheckedChange={v => handleChange(field.key, v)}
              disabled={isReadOnly}
            />
            <Label htmlFor={field.key} className="text-sm text-muted-foreground">
              {field.label}
            </Label>
          </div>
        );
      case 'date':
        return (
          <Input
            id={field.key}
            type="date"
            value={(value as string) || ''}
            onChange={e => handleChange(field.key, e.target.value)}
            disabled={isReadOnly}
            required={field.required}
          />
        );
      case 'time':
        return (
          <Input
            id={field.key}
            type="time"
            value={(value as string) || ''}
            onChange={e => handleChange(field.key, e.target.value)}
            disabled={isReadOnly}
            required={field.required}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/20 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {currentMode === 'create' && 'Create Student'}
            {currentMode === 'edit' && 'Edit Student'}
            {currentMode === 'view' && 'Student Details'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {/* System Fields */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={e => handleChange('name', e.target.value)}
                disabled={isReadOnly}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={e => handleChange('email', e.target.value)}
                disabled={isReadOnly}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={e => handleChange('phone', e.target.value)}
                disabled={isReadOnly}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status || 'active'}
                onValueChange={v => handleChange('status', v as StudentStatus)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Fields */}
            {customFields.map(field => (
              <div key={field.id} className="space-y-2">
                {field.type !== 'checkbox' && (
                  <Label htmlFor={field.key}>
                    {field.label} {field.required && '*'}
                  </Label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-2">
          {currentMode === 'view' && isAdmin && (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCurrentMode('edit')}
              >
                Edit
              </Button>
              {onDelete && student && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(student.id);
                    onClose();
                  }}
                >
                  Delete
                </Button>
              )}
            </>
          )}
          {(currentMode === 'edit' || currentMode === 'create') && isAdmin && (
            <>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                onClick={handleSubmit}
              >
                {currentMode === 'create' ? 'Create' : 'Save'}
              </Button>
            </>
          )}
          {!isAdmin && (
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
