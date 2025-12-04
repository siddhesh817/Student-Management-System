import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useCustomFields } from '@/hooks/useCustomFields';
import { CustomField, FieldType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const fieldTypes: FieldType[] = ['text', 'textarea', 'dropdown', 'checkbox', 'date', 'time'];

const defaultField: Omit<CustomField, 'id'> = {
  label: '',
  key: '',
  type: 'text',
  required: false,
  options: [],
};

const CustomFields: React.FC = () => {
  const { customFields, addCustomField, updateCustomField, deleteCustomField } = useCustomFields();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [formData, setFormData] = useState<Omit<CustomField, 'id'>>(defaultField);
  const [optionsInput, setOptionsInput] = useState('');

  const handleOpenCreate = () => {
    setEditingField(null);
    setFormData(defaultField);
    setOptionsInput('');
    setDialogOpen(true);
  };

  const handleOpenEdit = (field: CustomField) => {
    setEditingField(field);
    setFormData({
      label: field.label,
      key: field.key,
      type: field.type,
      required: field.required,
      options: field.options,
    });
    setOptionsInput(field.options?.join(', ') || '');
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const options = formData.type === 'dropdown'
      ? optionsInput.split(',').map(o => o.trim()).filter(Boolean)
      : undefined;

    const fieldData = {
      ...formData,
      key: formData.key || formData.label.toLowerCase().replace(/\s+/g, '_'),
      options,
    };

    if (editingField) {
      updateCustomField(editingField.id, fieldData);
      toast({ title: 'Field updated successfully' });
    } else {
      addCustomField(fieldData);
      toast({ title: 'Field created successfully' });
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCustomField(id);
    toast({ title: 'Field deleted successfully' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Custom Fields</h1>
            <p className="text-muted-foreground">
              Create and manage custom fields for student profiles
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingField ? 'Edit Field' : 'Create Custom Field'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., Gender"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={e => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g., gender (auto-generated if empty)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Field Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={v => setFormData({ ...formData, type: v as FieldType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map(type => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.type === 'dropdown' && (
                  <div className="space-y-2">
                    <Label htmlFor="options">Options (comma separated)</Label>
                    <Input
                      id="options"
                      value={optionsInput}
                      onChange={e => setOptionsInput(e.target.value)}
                      placeholder="e.g., Male, Female, Other"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="required"
                    checked={formData.required}
                    onCheckedChange={v => setFormData({ ...formData, required: !!v })}
                  />
                  <Label htmlFor="required">Required field</Label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingField ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* System Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Fields (Read-only)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['Name', 'Email', 'Phone', 'Status', 'Created Date'].map(field => (
                <Badge key={field} variant="secondary">
                  {field}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Fields Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Label</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customFields.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No custom fields yet. Click "Add Field" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                customFields.map(field => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium">{field.label}</TableCell>
                    <TableCell className="font-mono text-sm">{field.key}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {field.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{field.required ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {field.options?.join(', ') || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(field)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(field.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomFields;
