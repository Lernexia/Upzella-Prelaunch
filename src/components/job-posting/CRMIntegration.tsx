import React, { useEffect, useState } from 'react';
import { Plus, X, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface CRMProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
  endpoint: string;
  expanded?: boolean;
}

export interface CRMIntegrationData {
  providers: CRMProvider[];
}

interface CRMIntegrationProps {
  data: CRMIntegrationData;
  setData: React.Dispatch<React.SetStateAction<CRMIntegrationData>>;
  errors: Partial<Record<string, string>>;
}

// Generate API key and endpoint
const generateAPIKey = () => uuidv4();
const generateEndpoint = (name: string) => `https://api.${name.toLowerCase().replace(/\s+/g, '')}.com/v1`;


const CRMIntegration: React.FC<CRMIntegrationProps> = ({ data, setData, errors }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProviderName, setNewProviderName] = useState('');

  const toggleProvider = (id: string) => {
    setData(prev => ({
      ...prev,
      providers: prev.providers.map(p =>
        p.id === id
          ? {
              ...p,
              enabled: !p.enabled,
              apiKey: !p.enabled ? p.apiKey || generateAPIKey() : p.apiKey, // Set API key if enabling
              endpoint: !p.enabled ? p.endpoint || generateEndpoint(p.name) : p.endpoint, // Set endpoint if enabling
            }
          : p
      ),
    }));
  };
  

  const toggleExpanded = (id: string) => {
    setData(prev => ({
      ...prev,
      providers: prev.providers.map(p =>
        p.id === id ? { ...p, expanded: !p.expanded } : p
      ),
    }));
  };

  const updateProviderField = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      providers: prev.providers.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const addNewProvider = () => {
    if (!newProviderName.trim()) return;

    const newProvider: CRMProvider = {
      id: uuidv4(),
      name: newProviderName,
      enabled: true,
      expanded: true,
      apiKey: generateAPIKey(),
      endpoint: generateEndpoint(newProviderName),
    };

    setData(prev => ({
      ...prev,
      providers: [...prev.providers, newProvider],
    }));

    setNewProviderName('');
    setIsAddingNew(false);
  };


  return (
    <div className="form-section form-section-active animate-slide-in">
      <h3 className="section-title">CRM Integration</h3>

      <p className="text-sm text-gray-600 mb-4">
        Connect job postings with your existing CRM systems to automatically sync candidate data.
      </p>

      <div className="mb-6">
        <div className="grid gap-3">
          {data.providers.map((provider) => (
            <div
              key={provider.id}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${provider.enabled ? 'border-upzella-primary bg-upzella-neutral/20' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`provider-${provider.id}`}
                    checked={provider.enabled}
                    onChange={() => toggleProvider(provider.id)}
                    className="h-4 w-4 rounded border-gray-300 text-upzella-primary focus:ring-upzella-primary/25"
                  />
                  <label
                    htmlFor={`provider-${provider.id}`}
                    className={`ml-2 font-medium ${provider.enabled ? 'text-upzella-primary' : 'text-gray-700'}`}
                  >
                    {provider.name}
                  </label>
                </div>

                {provider.enabled && (provider.expanded = true)}

                {/* <button
                  type="button"
                  onClick={() => {
                    if (!provider.enabled) {
                      toggleExpanded(provider.id);
                    }
                  }}
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  aria-label={provider.expanded ? 'Collapse' : 'Expand'}
                >
                  {provider.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button> */}
              </div>

              {provider.enabled && provider.expanded && (
                <div className="p-3 pt-0 border-t border-gray-200 animate-fade-in">
                  <div className="mb-3">
                    <label htmlFor={`apikey-${provider.id}`} className="input-label">API Key</label>
                    <input
                      id={`apikey-${provider.id}`}
                      type="text"
                      value={provider.apiKey || ''}
                      onChange={(e) => updateProviderField(provider.id, 'apiKey', e.target.value)}
                      placeholder="Enter API key"
                      className="form-input"
                    />
                    {errors[`${provider.id}-apiKey`] && (
                      <p className="form-error">{errors[`${provider.id}-apiKey`]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`endpoint-${provider.id}`} className="input-label">API Endpoint</label>
                    <input
                      id={`endpoint-${provider.id}`}
                      type="text"
                      value={provider.endpoint || ''}
                      onChange={(e) => updateProviderField(provider.id, 'endpoint', e.target.value)}
                      placeholder="e.g. https://api.example.com/v1/jobs"
                      className="form-input"
                    />
                    {errors[`${provider.id}-endpoint`] && (
                      <p className="form-error">{errors[`${provider.id}-endpoint`]}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isAddingNew ? (
        <div className="mb-4 p-3 border rounded-md animate-scale-in">
          <h4 className="text-sm font-medium mb-2">Add Custom CRM Integration</h4>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newProviderName}
              onChange={(e) => setNewProviderName(e.target.value)}
              placeholder="CRM Provider Name"
              className="form-input flex-1"
              autoFocus
            />

            <button
              type="button"
              onClick={addNewProvider}
              disabled={!newProviderName.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>

            <button
              type="button"
              onClick={() => {
                setNewProviderName('');
                setIsAddingNew(false);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="inline-flex items-center text-sm font-medium text-upzella-primary hover:text-upzella-secondary px-3 py-1.5 rounded-md hover:bg-upzella-neutral transition-colors"
        >
          <Plus size={16} className="mr-1.5" />
          Add Custom Integration
        </button>
      )}
    </div>
  );
};

export default CRMIntegration;
