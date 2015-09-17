select ar.usr_profile, ar.rights
from adm_accounts acc, adm_access_rights ar
where acc.login = '60000710'
and acc.mdp = '2c54bde5d5af79dbb4cb5c54ef67b154'
and acc.usr_profile = ar.usr_profile;

SELECT DISTINCT usr_name, usr_pname
FROM adm_accounts acc
WHERE acc.login = '60000710'
AND acc.mdp = '2c54bde5d5af79dbb4cb5c54ef67b154';