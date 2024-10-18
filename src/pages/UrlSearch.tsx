import React, { useState } from 'react';

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  website: string;
}

const UrlSearch: React.FC = () => {
  const [url, setUrl] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCompanyInfo(null);

    if (!isValidUrl(url)) {
      setError('有効なURLを入力してください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/company-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました。');
      }

      const data = await response.json();
      setCompanyInfo(data);
    } catch (err) {
      setError('会社情報の取得に失敗しました。');
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">URLから会社情報を取得</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="会社のURLを入力"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            検索
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {companyInfo && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">項目</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">情報</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">会社名</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{companyInfo.name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">住所</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{companyInfo.address}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">電話番号</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{companyInfo.phone}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Webサイト</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{companyInfo.website}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UrlSearch;