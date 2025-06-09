import { getDbConnection } from './config/db.js';

(async () => {
  const db = await getDbConnection();
  const users = await db.all(` SELECT 
                id, 
                email, 
                nome, 
                senha 
            FROM 
                users`);
  console.log('Usuários:', users);
  await db.close();
})();

//node lisUser.js
//Rode isso para ver os usuários pelo terminal