import React, { useContext } from 'react';
import Players from '../components/Players';
import { AppContext } from '../state/AppContext';
import PropTypes from 'prop-types';

const initialForm = {
  appName: 'trident',
  componentName: 'trident-demo',
  version: '1.4.2.3',
};

const PlayersContainer = ({ history }) => {
  const { state, setState , setError} = useContext(AppContext);
  const submitForm = async (form) => {
    const { appName, componentName, version } = form;
    if (appName && componentName && version) {
      await setState({ ...state, loading: true, error: false });
      history.push(`/app/golive/${appName}/${componentName}/${version}`);
    }
    else {
      await setError('Your are missing some input values')
      history.push("/error")
    }
  };
  return <Players initialForm={initialForm} submitForm={submitForm} />;
};

PlayersContainer.propTypes = {
  history: PropTypes.object
}

export default PlayersContainer
