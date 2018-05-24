const getDatabaseConfig = (connectionString) => {
  const mainString = connectionString.split('//')[1];
  const serverStringArray = mainString.split(':');
  const user = serverStringArray[0];
  const passwordHostString = serverStringArray[1];
  const portDatabaseString = serverStringArray[2];
  const password = passwordHostString.split('@')[0];
  const host = passwordHostString.split('@')[1];
  const database = portDatabaseString.split('/')[1];
  return {
    user,
    host,
    database,
    password,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  };
};

export default getDatabaseConfig;
