import { useEffect, useState } from "react";

import './Version.css';
import { ApiVersion } from "./api/apiVersion";
import { cleanServiceWorkerCache, updateServiceWorkerRegistration } from "./util/service-worker.util";
import { API_VERSION_PATTERN } from "./constants";

function Version() {
  const [version, setVersion] = useState('1.0.0');
  const [newVersion, setNewVersion] = useState('');
  const [isNewTomorrow, setIsNewTomorrow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
    if (window.APP_VERSION) {
      setVersion(window.APP_VERSION);
    }
  }, []);

  const getLastVersion = async () => {
    setIsNewTomorrow(false);
    setIsLoading(true);
    setErrorMessage('');
    try {
      return await ApiVersion.getLastVersion();
    } catch (error) {
      setErrorMessage('Server is not reached. We are building an instance for you. Please try again after 60 seconds.');
      console.error(error);
      return '';
    }
    finally {
      setIsLoading(false);
    }
  }

  const checkNewVersion = async () => {
    const lastVersion = await getLastVersion();
    
    if (!lastVersion || lastVersion === version) {
      setIsNewTomorrow(true);
      return;
    }
      
    if (version === API_VERSION_PATTERN) {
      setVersion(lastVersion);
      return;
    }

    const [oldV1, oldV2, oldV3] = version.split('.').map((v: string) => parseInt(v));
    const [newV1, newV2, newV3] = lastVersion.split('.').map(v => parseInt(v));

    let isSetNewVersion = false;
    if (newV1 > oldV1) {
      isSetNewVersion = true;
    }
    else if (newV1 === oldV1) {
      if (newV2 > oldV2) {
        isSetNewVersion = true;
      }
      else if (newV2 === oldV2) {
        if (newV3 > oldV3) {
          isSetNewVersion = true;
        }
      }
    }

    if (isSetNewVersion) {
      setNewVersion(lastVersion);
    }
  }

  const updateVersion = async () => {
    console.log('update');
    await cleanServiceWorkerCache();
    await updateServiceWorkerRegistration();
    console.log('updated');
  }

  return (
    <>
      Current version: {version}
      {isLoading ? <p>Loading ...</p> : <p><button onClick={checkNewVersion}>Check new version</button></p> }
      {errorMessage ? <p><small className="error">{errorMessage}</small></p> : newVersion ? <><p>Availabale a new version: <span id="newVersion">{newVersion}</span></p><p><button onClick={updateVersion}>Update application</button></p></> : isNewTomorrow ? <p>New version will be ready tomorrow.</p> : null}
    </>
  )
}

export default Version;
