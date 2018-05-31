
var UserService = 
	{
		ws: appBase.storage,
		
		init: function(){
			if(appBase === undefined){
				this.ws = sessionStorage;
			}
		},
		
		newUser: function(uname, upwd){
			//alert("creating new user object - " + uname);
			return new User(uname, upwd);
		},
		
		setActiveUser: function(inUsr){
			if(inUsr){
				var usr = new User().copy(inUsr);
				delete usr.upwd;
				this.ws.activeUser = JSON.stringify(usr);
			} else {
				delete this.ws.activeUser;
			}
			//alert("setting active user - " + this.ws.activeUser);
		},
		
		geActiveUser: function(){
			//alert("getting active user - " + this.ws.activeUser);
			if(this.ws.activeUser){
				var activeUser = new User();
				activeUser.fromJS(this.ws.activeUser);
				return activeUser;
			} else {
				//alert("undefined");
				return undefined;
			}
		},
		
		loadOtherUsers: function(clbk){
			//alert(appBase.getRemoteURL("users/load"));
			var http = appBase.http();
			//alert(http)
			http.post(appBase.getRemoteURL("users/load"), { 'selector': {'uname': {$ne: this.geActiveUser().uname}}})
				.then(
				function(result){
					//alert(result.data);
					var users = result.data;
					clbk(users);
				},
				function (error) {
					alert("error " + error);
					clbk([]);
			    }
			);
		},
		
		
		
	};

UserService.init();


/**
 * ClassName User
 * @param uname
 * @param upwd
 * @returns User object
 */

function User(uname, upwd){
	//alert("Creating a user object");
	//properties
	this.uname = uname;
	this.upwd = upwd;
}

// functions
User.prototype.toStr = function(){
	return "{Name:" + this.uname /*+ ", Password:" + this.upwd*/ + "}";
}

User.prototype.equals = function(usr){
	//alert("Checking equality");
	var isSame = (this.uname == usr.uname
			&& this.upwd == usr.upwd);
	//alert(isSame);
	return isSame;
}

// build object from JSON String
User.prototype.fromJS = function(json){
	//alert(json);
	var uObj = JSON.parse(json);
	//alert(uObj);
	this.uname = uObj.uname;
	this.upwd = uObj.upwd;
	//alert(this.toStr());
	return this;
}

// to JSON String
User.prototype.toJS = function(){
	return JSON.stringify(this);
}

User.prototype.copy = function(obj){
	//alert(obj.uname + " " + obj.upwd);
	this.uname = obj.uname;
	this.upwd = obj.upwd;
	return this;
}
