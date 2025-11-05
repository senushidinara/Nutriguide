
import React from 'react';
import { UserProfile } from '../types';
import { X, CheckCircle, Dna, Beaker, Zap, LogOut } from './icons';

interface DataManagementModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onUpdateStatus: (
    type: 'geneticsDataStatus' | 'microbiomeDataStatus' | 'wearableStatus',
    status: 'not_connected'
  ) => void;
}

const DataManagementModal: React.FC<DataManagementModalProps> = ({ userProfile, onClose, onUpdateStatus }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-lg relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-background">
          <X className="w-5 h-5 text-text-muted" />
        </button>
        
        <h1 className="text-2xl font-bold text-center text-secondary mb-2">Manage Data Connections</h1>
        <p className="text-center text-text-secondary mb-8">View and control your connected health data sources.</p>
        
        <div className="space-y-4">
            <DataItem 
                icon={Dna}
                title="Genetic Blueprint"
                status={userProfile.geneticsDataStatus}
                onDisconnect={() => onUpdateStatus('geneticsDataStatus', 'not_connected')}
            />
            <DataItem 
                icon={Beaker}
                title="Microbiome Analysis"
                status={userProfile.microbiomeDataStatus}
                onDisconnect={() => onUpdateStatus('microbiomeDataStatus', 'not_connected')}
            />
            <DataItem 
                icon={Zap}
                title="Wearables"
                status={userProfile.wearableStatus}
                onDisconnect={() => onUpdateStatus('wearableStatus', 'not_connected')}
            />
        </div>

        <button
            onClick={onClose}
            className="mt-8 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
            Done
        </button>
      </div>
    </div>
  );
};

const DataItem = ({ icon: Icon, title, status, onDisconnect }: { icon: React.FC<{className?:string}>, title: string, status: string, onDisconnect: () => void }) => (
    <div className="flex items-center bg-background p-4 rounded-lg border border-border-color">
        <div className="w-10 h-10 bg-accent/50 rounded-lg flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-grow">
            <p className="font-bold text-text-primary">{title}</p>
            {status === 'connected' ? (
                <p className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Connected</p>
            ) : (
                <p className="text-sm text-text-muted">Not Connected</p>
            )}
        </div>
        {status === 'connected' && (
            <button
                onClick={onDisconnect}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-bold py-2 px-3 rounded-md hover:bg-red-100"
            >
                <LogOut className="w-4 h-4"/>
                Disconnect
            </button>
        )}
    </div>
);


export default DataManagementModal;
