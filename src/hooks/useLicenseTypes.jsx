import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";
export const useLicenseTypes = ({
  getMockLicenseTypes,
  rowsPerPage = 5,
  initialPage = 0,
}) => {
  const [licenseTypes, setLicenseTypes] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentLicenseType, setCurrentLicenseType] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSetSearchQuery = useMemo(
    () => debounce(value => setSearchQuery(value), 100),
    []
  );

  const handleSearchChange = useCallback(
    event => {
      const value = event.target.value;
      debouncedSetSearchQuery(value);
      setPage(0);
    },
    [debouncedSetSearchQuery]
  );

  const fetchLicenseTypes = () => {
    if (getMockLicenseTypes) {
      setLicenseTypes(getMockLicenseTypes());
    }
  };

  useEffect(() => {
    fetchLicenseTypes();
  }, [getMockLicenseTypes]);

  const filteredLicenseTypes = licenseTypes.filter(licenseType =>
    licenseType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedLicenseTypes = filteredLicenseTypes.slice(
    page * rowsPerPageState,
    page * rowsPerPageState + rowsPerPageState
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = newRowsPerPage => {
    setRowsPerPageState(newRowsPerPage);
    setPage(0);
  };

  const openCreateForm = () => {
    setIsCreateFormOpen(true);
  };

  const closeCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  const openEditForm = licenseType => {
    setCurrentLicenseType(licenseType);
    setIsEditFormOpen(true);
  };

  const closeEditForm = () => {
    setIsEditFormOpen(false);
    setCurrentLicenseType(null);
  };

  const handleCreateSubmit = formData => {
    const newLicenseType = {
      ...formData,
      id:
        licenseTypes.length > 0
          ? Math.max(...licenseTypes.map(lt => lt.id)) + 1
          : 1,
      paramCount: formData.parameters.length,
      createdAt: new Date().toLocaleDateString(),
    };
    setLicenseTypes([...licenseTypes, newLicenseType]);
    closeCreateForm();
  };

  const handleEditSubmit = formData => {
    const updatedLicenseTypes = licenseTypes.map(lt =>
      lt.id === currentLicenseType.id
        ? { ...formData, id: lt.id, createdAt: lt.createdAt }
        : lt
    );
    setLicenseTypes(updatedLicenseTypes);
    closeEditForm();
  };

  const handleDeleteLicenseType = id => {
    setLicenseTypes(licenseTypes.filter(lt => lt.id !== id));
    const remainingItems = filteredLicenseTypes.length - 1;
    const lastPage = Math.max(
      0,
      Math.ceil(remainingItems / rowsPerPageState) - 1
    );
    if (page > lastPage) {
      setPage(lastPage);
    }
  };

  return {
    licenseTypes: paginatedLicenseTypes,
    allLicenseTypes: licenseTypes,
    page,
    rowsPerPage: rowsPerPageState,
    searchQuery,
    isCreateFormOpen,
    isEditFormOpen,
    currentLicenseType,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
    openCreateForm,
    closeCreateForm,
    openEditForm,
    closeEditForm,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteLicenseType,
    totalCount: filteredLicenseTypes.length,
    fetchLicenseTypes,
  };
};
