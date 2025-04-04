import { useEffect, useState, useMemo, useCallback } from "react";
import { debounce } from "lodash";

export const useLicenses = ({
  getMockLicences,
  rowsPerPage = 5,
  initialPage = 0,
}) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentLicenseHistory, setCurrentLicenseHistory] = useState(null);
  const [licenses, setLicenses] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [extendFormOpen, setExtendFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const [currentLicenseId, setCurrentLicenseId] = useState(null);

  const [page, setPage] = useState(initialPage);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  useEffect(() => {
    if (getMockLicences) {
      setLicenses(getMockLicences());
    }
  }, [getMockLicences]);

  const filteredLicenses = useMemo(() => {
    if (!searchQuery) return licenses;

    const query = searchQuery.toLowerCase();
    return licenses.filter(
      license =>
        license.name.toLowerCase().includes(query) ||
        license.type.toLowerCase().includes(query) ||
        license.params.toLowerCase().includes(query)
    );
  }, [licenses, searchQuery]);

  const paginatedLicenses = filteredLicenses.slice(
    page * rowsPerPageState,
    page * rowsPerPageState + rowsPerPageState
  );

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const debouncedSetSearchQuery = useMemo(
    () => debounce(value => setSearchQuery(value), 100),
    []
  );

  const handleSearchChange = useCallback(
    event => {
      const value = event.target.value;
      debouncedSetSearchQuery(value);
    },
    [debouncedSetSearchQuery]
  );

  const getCurrentLicense = () => {
    return licenses.find(license => license.id === currentLicenseId) || null;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = newRowsPerPage => {
    setRowsPerPageState(newRowsPerPage);
    setPage(0);
  };

  const toggleRowExpansion = id => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenHistory = license => {
    setCurrentLicenseHistory(license);
    setHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryOpen(false);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleOpenEditForm = licenseId => {
    setCurrentLicenseId(licenseId);
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
    setCurrentLicenseId(null);
  };

  const handleOpenExtendForm = licenseId => {
    setCurrentLicenseId(licenseId);
    setExtendFormOpen(true);
  };

  const handleCloseExtendForm = () => {
    setExtendFormOpen(false);
    setCurrentLicenseId(null);
  };

  const handleOpenDeleteForm = licenseId => {
    setCurrentLicenseId(licenseId);
    setDeleteFormOpen(true);
  };

  const handleCloseDeleteForm = () => {
    setDeleteFormOpen(false);
    setCurrentLicenseId(null);
  };

  const handleFormSubmit = formData => {
    console.log("Form submitted with data:", formData);

    const newLicense = {
      id: licenses.length + 1,
      name: formData.name,
      type: formData.type,
      params: `Utilisateurs : ${formData.maxResources}, Durée : 12 mois`,
      creationDate: new Date().toLocaleDateString(),
      previousLicense: null,
      history: [
        {
          id: 1,
          user: "Current User",
          action: "Génération",
          date: new Date().toLocaleString(),
          details: {
            nom: formData.name,
            type: formData.type,
            parametres: {
              utilisateur: formData.maxResources,
              duree: "12 mois",
            },
            creationDate: new Date().toLocaleString(),
          },
        },
      ],
    };
    setLicenses([newLicense, ...licenses]);
  };

  const handleEditSubmit = formData => {
    console.log("Edit form submitted with data:", formData);

    setLicenses(prev =>
      prev.map(license => {
        if (license.id === formData.id) {
          const historyEntry = {
            id: license.history.length + 1,
            user: "Current User",
            action: "Modification",
            date: new Date().toLocaleString(),
            details: {
              nom: formData.name,
              type: formData.type,
              parametres: {
                utilisateur: formData.maxResources,
                duree: "12 mois",
              },
              creationDate: new Date().toLocaleString(),
            },
          };

          return {
            ...license,
            name: formData.name,
            type: formData.type,
            params: `Utilisateurs : ${formData.maxResources}, Durée : 12 mois`,
            history: [historyEntry, ...license.history],
          };
        }
        return license;
      })
    );
  };

  const handleExtendSubmit = formData => {
    console.log("Extend form submitted with data:", formData);

    setLicenses(prev =>
      prev.map(license => {
        if (license.id === formData.id) {
          const historyEntry = {
            id: license.history.length + 1,
            user: "Current User",
            action: "Extension",
            date: new Date().toLocaleString(),
            details: {
              nom: license.name,
              type: license.type,
              parametres: {
                utilisateur: formData.maxResources,
                duree: "Prolongé jusqu'au " + formData.endDate,
              },
              creationDate: new Date().toLocaleString(),
            },
          };

          const previousLicense = {
            name: license.name,
            type: license.type,
            params: license.params,
            creationDate: license.creationDate,
          };

          return {
            ...license,
            params: `Utilisateurs : ${formData.maxResources}, Durée étendue jusqu'au ${formData.endDate}`,
            previousLicense: previousLicense,
            history: [historyEntry, ...license.history],
          };
        }
        return license;
      })
    );
  };

  const handleDeleteSubmit = () => {
    console.log("Delete license with ID:", currentLicenseId);
    setLicenses(prev =>
      prev.filter(license => license.id !== currentLicenseId)
    );
  };

  return {
    licenses: paginatedLicenses,
    setSearchQuery,
    searchQuery,

    expandedRows,
    toggleRowExpansion,
    historyOpen,
    handleOpenHistory,
    handleCloseHistory,
    currentLicenseHistory,

    formOpen,
    handleOpenForm,
    handleCloseForm,
    handleFormSubmit,

    editFormOpen,
    handleOpenEditForm,
    handleCloseEditForm,
    handleEditSubmit,

    extendFormOpen,
    handleOpenExtendForm,
    handleCloseExtendForm,
    handleExtendSubmit,

    deleteFormOpen,
    handleOpenDeleteForm,
    handleCloseDeleteForm,
    handleDeleteSubmit,

    currentLicenseId,
    getCurrentLicense,

    page,
    rowsPerPage: rowsPerPageState,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount: filteredLicenses.length,

    handleSearchChange,
  };
};
