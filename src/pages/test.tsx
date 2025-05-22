import { useState } from 'react';
import { testConnection } from '../lib/supabase';

export default function TestConnection() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleTestConnection = async () => {
    setLoading(true);
    setResults(null);

    try {
      const connectionResult = await testConnection();
      setResults(connectionResult);

    } catch (error) {
      console.error('error in the test:', error);
      setResults({ success: false, error: 'unexpected error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleTestConnection}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'testing connection...' : 'test connection'}
        </button>
      </div>

      {results && (
        <div style={{
          backgroundColor: results.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${results.success ? '#c3e6cb' : '#f5c6cb'}`,
          color: results.success ? '#155724' : '#721c24',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>
            {results.success ? '✅ connection successful' : '❌ connection error'}
          </h3>
          
          {results.success ? (
            <div>
              <p><strong>cats found:</strong> {results.data?.length || 0}</p>
              {results.data && results.data.length > 0 && (
                <div>
                  <pre style={{ 
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    padding: '10px', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    overflow: 'auto'
                  }}>
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <p><strong>error:</strong> {results.error}</p>
          )}
        </div>
      )}
    </div>
  );
}