import { useEffect, useState } from "react";

import './Version.css';

import { APP_VERSION } from "./constants";
import { ApiVersion } from "./api/apiVersion";

function Version() {
  const [version] = useState(APP_VERSION);
  const [newVersion, setNewVersion] = useState('');
  const [isNewTomorrow, setIsNewTomorrow] = useState(false);

  const getNewVersion = async () => {
    try {
      const lastVersion = await ApiVersion.getLastVersion();
      if (lastVersion && lastVersion !== version) {
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
      else {
        setIsNewTomorrow(true);
      }
    } catch (error) {
      console.error(error);
    }
    
  }

  useEffect(() => {
    getNewVersion();
  }, []);

  setTimeout(getNewVersion, 5 * 60 * 1000);

  return (
    <>
      Current version: {APP_VERSION}
      {newVersion ? <p>Availabale a new version: <span id="newVersion">{newVersion}</span></p> : isNewTomorrow ? <p>New version will be ready tomorrow.</p> : null}
    </>
  )
}

export default Version;
