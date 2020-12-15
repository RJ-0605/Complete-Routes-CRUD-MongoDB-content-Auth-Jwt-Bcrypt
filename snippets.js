


curl -H "Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDYxMTI3NjV9.y363SBAGSH-Izy9PTFwUqDb9eg0fi9ik_j2yVCTR-Ks" http://localhost:3000/secret

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDYxMTI3NjV9.y363SBAGSH-Izy9PTFwUqDb9eg0fi9ik_j2yVCTR-Ks

let token = req.headers.authorization.split(" ")[1];


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2MDYxMTM0Njh9.nHtRUOnNce8e275J62Fm3f7zjkJ6GY2Z6N2R3hBHWTo

curl -H "Authorization: jwt " http://localhost:3000/secret



function isAuthorized(req,res, next){
		if (typeof req.headers.authorization !== 'undefined' ){
				let token = req.headers.authorization.split(" ")[1];
				let privateKey= fs.readFileSync('./private.pem', 'utf-8');
				
				jwt.verify(token, privateKey, { algorithm:'HS256' }, (err, decoded) => { 
							if (err) {
								res.status(500).json({ error: "Not  decoded or Authorized" })
							 console.log(decoded);
							 
							 return next();
							 }
				})
			
			
		}  else {
				res.status(500).json({ error: "Not Authorized "})
		
		}
			




}
