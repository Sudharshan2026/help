import React, { useState, useMemo, useCallback } from 'react';
import { getRequests, updateRequest, exportToCSV } from '../utils/storage';
import type { Request, AdminStats, SortConfig, FilterConfig, GroupConfig, ColumnConfig } from '../types';
import { Download, Search, Filter, Columns, ChevronDown, ChevronRight, X, RefreshCw, Save, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // State Management
  const [requests, setRequests] = useState<Request[]>(getRequests());
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>([]);
  const [groupConfig, setGroupConfig] = useState<GroupConfig[]>([]);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>([
    { field: 'createdAt', label: 'Date', visible: true, width: 120 },
    { field: 'studentName', label: 'Student Name', visible: true, width: 200 },
    { field: 'secRollNumber', label: 'Student ID', visible: true, width: 120 },
    { field: 'yearOfStudy', label: 'Year', visible: true, width: 80 },
    { field: 'section', label: 'Section', visible: true, width: 80 },
    { field: 'type', label: 'Type', visible: true, width: 100 },
    { field: 'protocolType', label: 'Protocol Type', visible: true, width: 120 },
    { field: 'eventType', label: 'Event Type', visible: true, width: 120 },
    { field: 'teamName', label: 'Team Name', visible: true, width: 150 },
    { field: 'startDate', label: 'Start Date', visible: true, width: 120 },
    { field: 'endDate', label: 'End Date', visible: true, width: 120 },
    { field: 'reason', label: 'Reason', visible: true, width: 300 },
    { field: 'documentUrl', label: 'Verification Document', visible: true, width: 150 },
    { field: 'authLetterUrl', label: 'Authorization Letter', visible: true, width: 150 },
    { field: 'attendancePercentage', label: 'Attendance %', visible: true, width: 120 },
    { field: 'numberOfArrears', label: 'Arrears', visible: true, width: 100 },
    { field: 'status', label: 'Status', visible: true, width: 200 },
  ]);
  const [showColumnCustomizer, setShowColumnCustomizer] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilterPreset, setActiveFilterPreset] = useState<string>('');
  const [filterPresets, setFilterPresets] = useState<Record<string, FilterConfig[]>>({});
  const [newFilter, setNewFilter] = useState<Partial<FilterConfig>>({
    field: '',
    operator: 'equals',
    value: '',
  });

  // Stats calculation
  const stats: AdminStats = useMemo(() => ({
    totalRequests: requests.length,
    pendingRequests: requests.filter((r) => r.status === 'PENDING').length,
    approvedRequests: requests.filter((r) => r.status === 'APPROVED').length,
    rejectedRequests: requests.filter((r) => r.status === 'REJECTED').length,
  }), [requests]);

  // Handle status update
  const handleStatusUpdate = (requestId: string, newStatus: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    updateRequest(requestId, { status: newStatus });
    setRequests(getRequests()); // Refresh the requests list
  };

  // Data Processing Functions
  const applySort = useCallback((data: Request[]) => {
    if (sortConfig.length === 0) return data;
    
    return [...data].sort((a, b) => {
      for (const sort of sortConfig) {
        const aVal = a[sort.field as keyof Request];
        const bVal = b[sort.field as keyof Request];
        
        // Handle different types of values
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.localeCompare(bVal);
          return sort.direction === 'asc' ? comparison : -comparison;
        }
        
        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  const applyFilter = useCallback((data: Request[]) => {
    if (filterConfig.length === 0) return data;

    return data.filter(item => {
      return filterConfig.every(filter => {
        const value = item[filter.field as keyof Request];
        
        switch (filter.operator) {
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
          case 'equals':
            if (typeof value === 'number') {
              return Number(value) === Number(filter.value);
            }
            return String(value).toLowerCase() === String(filter.value).toLowerCase();
          case 'greaterThan':
            return Number(value) > Number(filter.value);
          case 'lessThan':
            return Number(value) < Number(filter.value);
          case 'between':
            if (!filter.range) return true;
            const numValue = Number(value);
            return numValue >= filter.range[0] && numValue <= filter.range[1];
          default:
            return true;
        }
      });
    });
  }, [filterConfig]);

  const applyGroup = useCallback((data: Request[]) => {
    if (groupConfig.length === 0) return { data, groups: [] };

    const groups: any[] = [];
    let groupedData = data;

    groupConfig.forEach((group, index) => {
      const groupMap = new Map();
      
      groupedData.forEach(item => {
        const key = item[group.field];
        if (!groupMap.has(key)) {
          groupMap.set(key, []);
        }
        groupMap.get(key).push(item);
      });

      const newGroups = Array.from(groupMap.entries()).map(([key, items]) => ({
        id: `group-${index}-${key}`,
        field: group.field,
        value: key,
        items,
        collapsed: false,
        level: index,
      }));

      groups.push(...newGroups);
      groupedData = [...groupMap.values()].flat();
    });

    return { data: groupedData, groups };
  }, [groupConfig]);

  // Process Data
  const processedData = useMemo(() => {
    let filtered = applyFilter(requests);
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((r) =>
        r.studentName.toLowerCase().includes(searchLower) ||
        r.secRollNumber.toLowerCase().includes(searchLower) ||
        r.reason.toLowerCase().includes(searchLower)
      );
    }
    const sorted = applySort(filtered);
    return applyGroup(sorted);
  }, [requests, search, applySort, applyFilter, applyGroup]);

  // Event Handlers
  const handleSort = (field: keyof Request) => {
    setSortConfig(prev => {
      const existingSort = prev.find(s => s.field === field);
      if (!existingSort) {
        return [...prev, { field, direction: 'asc' }];
      }
      if (existingSort.direction === 'asc') {
        return prev.map(s => s.field === field ? { ...s, direction: 'desc' } : s);
      }
      return prev.filter(s => s.field !== field);
    });
  };

  const handleAddFilter = () => {
    if (!newFilter.field || !newFilter.operator) return;
    
    setFilterConfig(prev => [...prev, newFilter as FilterConfig]);
    setNewFilter({ field: '', operator: 'equals', value: '' });
  };

  const handleRemoveFilter = (index: number) => {
    setFilterConfig(prev => prev.filter((_, i) => i !== index));
  };

  const handleGroup = (field: keyof Request) => {
    setGroupConfig(prev => {
      const exists = prev.find(g => g.field === field);
      if (exists) return prev.filter(g => g.field !== field);
      return [...prev, { field }];
    });
  };

  const handleColumnResize = (field: string, width: number) => {
    setColumnConfig(prev => 
      prev.map(col => col.field === field ? { ...col, width } : col)
    );
  };

  const handleColumnVisibility = (field: string, visible: boolean) => {
    setColumnConfig(prev => 
      prev.map(col => col.field === field ? { ...col, visible } : col)
    );
  };

  const handleSaveFilterPreset = (name: string) => {
    setFilterPresets(prev => ({
      ...prev,
      [name]: filterConfig,
    }));
  };

  const handleLoadFilterPreset = (name: string) => {
    setFilterConfig(filterPresets[name]);
    setActiveFilterPreset(name);
  };

  const handleReset = () => {
    setSortConfig([]);
    setFilterConfig([]);
    setGroupConfig([]);
    setColumnConfig(prev => prev.map(col => ({ ...col, visible: true, width: col.width })));
    setSearch('');
    setActiveFilterPreset('');
  };

  // Render Cell
  const renderCell = (request: Request, field: string) => {
    switch (field) {
      case 'createdAt':
      case 'startDate':
      case 'endDate':
        return new Date(request[field]).toLocaleDateString();
      case 'documentUrl':
      case 'authLetterUrl':
        return request[field] ? (
          <a
            href={request[field]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#bd9607] hover:underline"
          >
            View Document
          </a>
        ) : 'Not Available';
      case 'attendancePercentage':
        return `${request.attendancePercentage}%`;
      case 'protocolType':
        return request.type === 'OD' ? request.protocolType : '-';
      case 'eventType':
        return request.type === 'OD' ? (request.eventType || '-') : '-';
      case 'teamName':
        return request.type === 'OD' ? (request.teamName || '-') : '-';
      case 'status':
        return (
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold
              ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : ''}
              ${request.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
            `}>
              {request.status}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleStatusUpdate(request.id, 'APPROVED')}
                className={`p-1 rounded-full ${request.status === 'APPROVED' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                title="Approve"
              >
                <CheckCircle size={20} />
              </button>
              <button
                onClick={() => handleStatusUpdate(request.id, 'REJECTED')}
                className={`p-1 rounded-full ${request.status === 'REJECTED' ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                title="Reject"
              >
                <XCircle size={20} />
              </button>
              <button
                onClick={() => handleStatusUpdate(request.id, 'PENDING')}
                className={`p-1 rounded-full ${request.status === 'PENDING' ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                title="Mark as Pending"
              >
                <Clock size={20} />
              </button>
            </div>
          </div>
        );
      default:
        return request[field as keyof Request];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
          <p className="text-3xl font-bold text-[#bd9607]">{stats.totalRequests}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-500">{stats.pendingRequests}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-500">{stats.approvedRequests}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-500">{stats.rejectedRequests}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd9607]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Column Customizer */}
          <button
            onClick={() => setShowColumnCustomizer(!showColumnCustomizer)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Columns size={20} />
            <span>Columns</span>
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => exportToCSV(processedData.data)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#bd9607] text-white rounded-md hover:bg-[#a68206]"
          >
            <Download size={20} />
            <span>Export CSV</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <RefreshCw size={20} />
            <span>Reset</span>
          </button>
        </div>

        {/* Column Customizer Panel */}
        {showColumnCustomizer && (
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-4">Customize Columns</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {columnConfig.map(col => (
                <label key={col.field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={col.visible}
                    onChange={(e) => handleColumnVisibility(col.field, e.target.checked)}
                    className="rounded text-[#bd9607] focus:ring-[#bd9607]"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mb-6 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const name = prompt('Enter preset name:');
                    if (name) handleSaveFilterPreset(name);
                  }}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Save size={16} />
                  <span>Save Preset</span>
                </button>
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          try {
                            const presets = JSON.parse(e.target?.result as string);
                            setFilterPresets(presets);
                          } catch (error) {
                            console.error('Error loading presets:', error);
                          }
                        };
                        reader.readAsText(file);
                      }
                    };
                    input.click();
                  }}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Upload size={16} />
                  <span>Import Presets</span>
                </button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="space-y-2 mb-4">
              {filterConfig.map((filter, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                  <span>{columnConfig.find(col => col.field === filter.field)?.label}</span>
                  <span>{filter.operator}</span>
                  <span>{Array.isArray(filter.value) ? filter.value.join(' - ') : filter.value}</span>
                  <button
                    onClick={() => handleRemoveFilter(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Filter Presets */}
            {Object.keys(filterPresets).length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Saved Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filterPresets).map(([name, filters]) => (
                    <button
                      key={name}
                      onClick={() => handleLoadFilterPreset(name)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        activeFilterPreset === name ? 'bg-[#bd9607] text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add Filter Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                className="border rounded-md p-2"
                value={newFilter.field}
                onChange={(e) => setNewFilter({ ...newFilter, field: e.target.value })}
              >
                <option value="">Select field...</option>
                {columnConfig.map(col => (
                  <option key={col.field} value={col.field}>{col.label}</option>
                ))}
              </select>

              <select
                className="border rounded-md p-2"
                value={newFilter.operator}
                onChange={(e) => setNewFilter({ ...newFilter, operator: e.target.value as FilterConfig['operator'] })}
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="greaterThan">Greater Than</option>
                <option value="lessThan">Less Than</option>
                <option value="between">Between</option>
              </select>

              {newFilter.operator === 'between' ? (
                <>
                  <input
                    type="text"
                    placeholder="From"
                    className="border rounded-md p-2"
                    value={newFilter.range?.[0] || ''}
                    onChange={(e) => setNewFilter({
                      ...newFilter,
                      range: [e.target.value, newFilter.range?.[1] || '']
                    })}
                  />
                  <input
                    type="text"
                    placeholder="To"
                    className="border rounded-md p-2"
                    value={newFilter.range?.[1] || ''}
                    onChange={(e) => setNewFilter({
                      ...newFilter,
                      range: [newFilter.range?.[0] || '', e.target.value]
                    })}
                  />
                </>
              ) : (
                <input
                  type="text"
                  placeholder="Value"
                  className="border rounded-md p-2"
                  value={newFilter.value || ''}
                  onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
                />
              )}

              <button
                onClick={handleAddFilter}
                className="bg-[#bd9607] text-white px-4 py-2 rounded-md hover:bg-[#a68206]"
              >
                Add Filter
              </button>
            </div>

            {/* Group By */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Group By</h4>
              <div className="flex flex-wrap gap-2">
                {columnConfig.map(col => (
                  <button
                    key={col.field}
                    onClick={() => handleGroup(col.field as keyof Request)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      groupConfig.some(g => g.field === col.field)
                        ? 'bg-[#bd9607] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                {columnConfig.filter(col => col.visible).map(col => (
                  <th
                    key={col.field}
                    className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider cursor-pointer select-none"
                    style={{ width: col.width }}
                    onClick={() => handleSort(col.field as keyof Request)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{col.label}</span>
                      {sortConfig.find(s => s.field === col.field) && (
                        <ChevronDown className={`w-4 h-4 transform ${
                          sortConfig.find(s => s.field === col.field)?.direction === 'desc' ? 'rotate-180' : ''
                        }`} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedData.groups.length > 0 ? (
                processedData.groups.map(group => (
                  <React.Fragment key={group.id}>
                    <tr className="bg-gray-50">
                      <td colSpan={columnConfig.filter(c => c.visible).length} className="px-6 py-2">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => group.collapsed = !group.collapsed}>
                            {group.collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          <span className="font-medium">{group.field}: {group.value}</span>
                          <span className="text-gray-500">({group.items.length} items)</span>
                        </div>
                      </td>
                    </tr>
                    {!group.collapsed && group.items.map((request: Request) => (
                      <tr key={request.id}>
                        {columnConfig.filter(col => col.visible).map(col => (
                          <td key={col.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {renderCell(request, col.field)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                processedData.data.map(request => (
                  <tr key={request.id}>
                    {columnConfig.filter(col => col.visible).map(col => (
                      <td key={col.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {renderCell(request, col.field)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard };