import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Building2, FileText, Edit, Trash2 } from 'lucide-react';
import { Client } from '@/lib/api';


interface ClientDetailsProps {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({
  client,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <div className="space-y-6 animate-modal-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{client.name}</h2>
          <p className="text-muted-foreground">{client.company}</p>
        </div>
        <Badge variant={client.active ? "default" : "secondary"} className="ml-2">
          {client.active ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Mail className="mr-2 h-5 w-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a 
                  href={`mailto:${client.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {client.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a 
                  href={`tel:${client.phone}`}
                  className="text-sm text-primary hover:underline"
                >
                  {client.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{client.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-primary" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Company</p>
              <p className="text-sm text-muted-foreground">{client.company}</p>
            </div>

            <div>
              <p className="text-sm font-medium flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Description
              </p>
              <p className="text-sm text-muted-foreground mt-1">{client.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="outline"
          onClick={onEdit}
          className="hover:bg-primary hover:text-primary-foreground bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Edit className="mr-2 h-4 w-4 " />
          Edit Client
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          className="hover:bg-destructive/90 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Client
        </Button>
      </div>
    </div>
  );
};