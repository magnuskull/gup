import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		if (this.get("authorArr").length === 0) {
			if (this.get("arrOfAuthorsFromImport")) {
	            if (this.get("arrOfAuthorsFromImport").length === 0) {
	                this.send('addNewAuthorRow');
	            }
	            else {
	            	var that = this;
	                this.get("arrOfAuthorsFromImport").forEach(function(author) {
	                    that.send('addNewAuthorRow', author);
	                });
	            }
	        }
	        else {
	        	this.send('addNewAuthorRow');
	        }
		}
	},

	generateUUID: function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c==='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	},

	isThisTheOnlyAuthorRow: function() {
		if (this.get("authorArr").length === 1) {
		  return true;
		}
		else {
		  return false;
		}
	}.property('authorArr.@each'),


	actions: {
	    moveUp: function(id) {
	      // first find the item and its index
	      var curPos = null;
	      var temp = this.get("authorArr").find(function(item, index) {
	        if (item.id === id) {
	          curPos = index;
	          return true;
	        }
	      });
	      if (curPos > 0) {
	        var temp2 = this.get("authorArr").objectAt(curPos-1);
	        this.get("authorArr").removeAt(curPos);
	        this.get("authorArr").insertAt(curPos, temp2);
	        this.get("authorArr").removeAt(curPos-1);
	        this.get("authorArr").insertAt(curPos-1, temp);
	      }
	    },
	    moveDown: function(id) {
	        // first find the item and its index
	        var curPos = null;
	        var temp = this.get("authorArr").find(function(item, index) {
	          if (item.id === id) {
	            curPos = index;
	            return true;
	          }
	        });
	        if (curPos < (this.get("authorArr").length-1)) {
	          var temp2 = this.get("authorArr").objectAt(curPos+1);
	          this.get("authorArr").removeAt(curPos);
	          this.get("authorArr").insertAt(curPos, temp2);
	          this.get("authorArr").removeAt(curPos+1);
	          this.get("authorArr").insertAt(curPos+1, temp);
	        }
	    },
		addNewAuthorRow: function(name) {
	      this.get("authorArr").addObject(
	        Ember.Object.create({
	          importedAuthorName: name,
	          id: this.generateUUID(),
	          selectedAuthor: null,
	          selectedInstitution: null,
	          newAuthorForm: Ember.Object.create({firstName: '', lastName: '', year_of_birth: '', xaccount: '', orcid: ''})
	        })
	      );
	    },
	    removeAuthorRow: function(id) {
	      var list = this.get("authorArr").toArray();
	      var that = this;
	      list.forEach(function(item) {
	        if (item.id === id) {
	          that.get("authorArr").removeObject(item);
	        }
	      });
	    },


	}
});
