import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { Alert, Snackbar } from "@mui/material";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(true);

  useEffect(() => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [dispatch, navigate]);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleAlertClose} icon={false} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <Alert severity="info" onClose={handleAlertClose}>
        Logging out... You will be redirected to the Login page in 5 seconds.
      </Alert>
    </Snackbar>
  );
}

export default Logout;
