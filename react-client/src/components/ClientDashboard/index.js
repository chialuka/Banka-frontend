import React from 'react';
import { withRouter } from 'react-router-dom';

const ClientDashboardPage = withRouter((props) => {

  return (
    <div>Welcome Home</div>
  )
});

const ClientDashboard = withRouter(ClientDashboardPage);

export default ClientDashboard;
