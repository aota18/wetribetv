import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { alertService, AlertType } from "../services/alert.service";

const Alert = ({ id, fade }) => {
  const router = useRouter();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // Clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // set 'KeepAfterRouteChange' flag to false on the rest
          filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
        });
      } else {
        // add alert to array
        setAlerts((alerts) => [...alerts, alert]);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    // Clear alerts on location change
    const clearAlerts = () => {
      setTimeout(() => alertService.clear(id));
    };

    router.events.on("routerChangeStart", clearAlerts);

    // Clean up function that runs when the component unmounts
    return () => {
      // Unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off("routeChangeStart", clearAlerts);
    };
  }, []);

  const removeAlert = (alert) => {
    if (fade) {
      // Fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );

      // Remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      // Remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  };

  const cssClasses = (alert) => {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertType.Success]: "alert-success",
      [AlertType.Error]: "alert-danger",
      [AlertType.Info]: "alert-info",
      [AlertType.Warning]: "alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  };

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Alert };
