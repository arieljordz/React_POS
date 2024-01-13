import React, {useEffect, useState} from 'react'
import Layout from './Layout';
import ActiveMenu from "../custom/ActiveMenu";


function Dashboard() {
  useEffect(() => {
    ActiveMenu("dashboard");
  }, []);

  return (
    <Layout>

    </Layout>
  )
}

export default Dashboard
