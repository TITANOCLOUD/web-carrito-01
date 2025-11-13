'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Server, Plus, Copy, Check } from 'lucide-react';

export default function MonitoringHostsPage() {
  const [hosts, setHosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [newHost, setNewHost] = useState({
    hostname: '',
    ip_address: '',
    description: ''
  });
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  useEffect(() => {
    loadHosts();
  }, []);

  const loadHosts = async () => {
    try {
      const response = await fetch('/api/hosts/list');
      const data = await response.json();
      setHosts(data.hosts || []);
    } catch (error) {
      console.error('Error cargando hosts:', error);
    }
  };

  const registerHost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/hosts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHost)
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedToken(data.api_key);
        setNewHost({ hostname: '', ip_address: '', description: '' });
        setShowForm(false);
        loadHosts();
      }
    } catch (error) {
      console.error('Error registrando host:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Hosts Monitoreados</h1>
            <p className="text-muted-foreground mt-2">Gestiona los servidores conectados al sistema de monitoreo</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Host
          </Button>
        </div>

        {showForm && (
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle>Registrar Nuevo Host</CardTitle>
              <CardDescription>Ingresa los datos del servidor a monitorear</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={registerHost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hostname">Hostname *</Label>
                  <Input
                    id="hostname"
                    placeholder="servidor-01.ejemplo.com"
                    value={newHost.hostname}
                    onChange={(e) => setNewHost({ ...newHost, hostname: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip_address">Dirección IP</Label>
                  <Input
                    id="ip_address"
                    placeholder="192.168.1.100"
                    value={newHost.ip_address}
                    onChange={(e) => setNewHost({ ...newHost, ip_address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Servidor de producción en datacenter principal"
                    value={newHost.description}
                    onChange={(e) => setNewHost({ ...newHost, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar Host'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {generatedToken && (
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-500">Token Generado Exitosamente</CardTitle>
              <CardDescription>Copia este token y úsalo en el instalador del agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-4 bg-background rounded-lg border">
                <code className="flex-1 text-sm font-mono">{generatedToken}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(generatedToken)}
                >
                  {copiedToken === generatedToken ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hosts.map((host) => (
            <Card key={host.host_id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Server className="h-8 w-8 text-cyan-500" />
                  <span className={`px-2 py-1 rounded text-xs ${
                    host.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                  }`}>
                    {host.status}
                  </span>
                </div>
                <CardTitle className="mt-4">{host.hostname}</CardTitle>
                {host.ip_address && (
                  <CardDescription>{host.ip_address}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {host.description && (
                  <p className="text-sm text-muted-foreground mb-4">{host.description}</p>
                )}
                <div className="text-xs text-muted-foreground">
                  Registrado: {new Date(host.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hosts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Server className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay hosts registrados</p>
              <Button className="mt-4" onClick={() => setShowForm(true)}>
                Registrar Primer Host
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
