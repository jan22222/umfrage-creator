import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Card,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import { useSelector, useDispatch } from "react-redux";
import { createSurvey, updateSurvey, deleteSurvey, loadSurveys } from "../surveyslice";

import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

  const handleCreateNewRow = (values) => {
    createSurvey(values);
  };

  const handleDeleteRow = (row, surveyData) => {
    console.log("delete row");
     
    deleteSurvey(surveyData[row.id].id);
  };

const SurveysComponent = () => {
    const { createUser,
    user,
    userId,
    userDisplayName,
    userEmail,
    userPhotoURL,
    loginUser,
    logOut,
    loading,
    isLoggedIn } = useContext(AuthContext);

  const dispatch = useDispatch()
 
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const isLoading = useSelector((state) => state.surveys.isLoading)
  const surveyData = useSelector((state) =>state.surveys.surveys)



  useEffect(()=>{
    dispatch(loadSurveys(userId))
    console.log(",mm,mmn", surveyData)
    },[userId])

    const handleSaveRowEdits = async ({ exitEditingMode, row, values, surveyData }) => {
    if (!Object.keys(validationErrors).length) {
      surveyData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      console.log(values);
      updateSurvey(values);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
                ? validateAge(+event.target.value)
                : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: { xs: 0, md: 0, xl: 80 },
    },
    {
      accessorKey: "title",
      header: "Titel",
      size: 140,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
  ]);

  return (
    <>
      {
      userId!="" ? (
        <Card padding="max(20px,20%)">
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 120,
              },
            }}
            columns={columns}
            data={surveyData}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Editieren">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Löschen">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row, surveyData)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="ansehen">
                  <IconButton color="error">
                    <a
                      href={"/survey/" + userId + "/" + surveyData[row.id].id}
                    >
                      <ArrowForwardIosIcon />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Abstimmung">
                  <IconButton
                    color="error"
                    display={{ xs: "none", md: "block" }}
                  >
                    <a href={"/vote/" + userId + "/" + surveyData[row.id].id}> 
                      Voting
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Einladen">
                  <IconButton
                    color="error"
                    display={{ xs: "none", md: "block" }}
                  >
                    <a
                      href={
                        "/survey/" +
                        userId +
                        "/" +
                       surveyData[row.id].id +
                        "/invitation"
                      }
                    >
                      Einladen
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Ergebnisse">
                  <IconButton
                    color="error"
                    display={{ xs: "none", md: "block" }}
                  >
                    <a
                      href={"/summary/" + userId + "/" + surveyData[row.id].id}
                    >
                      Results
                    </a>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                New survey
              </Button>
            )}
          />
          <CreateNewAccountModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </Card>
      ) : (
        <div>not logged in.</div>
      )}
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Neue Umfrage erstellen</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey != "id") {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Neue Umfrage erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) =>
  !!value.length ? value.length < 60 : false;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default SurveysComponent;
