import React from "react";
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";

import EditProviderItem from "./EditProviderItem";

const EditProviderList = ({ providers }) => {
  return providers.length !== 0 ? (
    <>
      <h2>Proveedores agregados</h2>
      <ul className="providerList">
        {providers.map(
          ({
            name,
            _id,
            deleteProvider,
            handleChange,
            contract,
            receivedTypeOfService
          }) => (
            <EditProviderItem
              key={_id}
              _id={_id}
              name={name}
              deleteProvider={deleteProvider}
              handleChange={handleChange}
              contract={contract}
              receivedTypeOfService={receivedTypeOfService}
            />
          )
        )}
      </ul>
    </>
  ) : null;
};

export default EditProviderList;
