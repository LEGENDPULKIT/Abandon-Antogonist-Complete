function Group() {
 
    //basically extending the array
    var array = [];
   
    /**
    * Gets the member at index i.
    *
    * @method get
    * @param {Number} i The index of the object to retrieve
    */
    array.get = function(i) {
      return array[i];
    };
   
    /**
    * Checks if the group contains a sprite.
    *
    * @method contains
    * @param {Sprite} sprite The sprite to search
    * @return {Number} Index or -1 if not found
    */
    array.contains = function(sprite) {
      return this.indexOf(sprite)>-1;
    };
   
    /**
     * Same as Group.contains
     * @method indexOf
     */
    array.indexOf = function(item) {
      for (var i = 0, len = array.length; i < len; ++i) {
        if (virtEquals(item, array[i])) {
          return i;
        }
      }
      return -1;
    };
   
    /**
    * Adds a sprite to the group.
    *
    * @method add
    * @param {Sprite} s The sprite to be added
    */
    array.add = function(s) {
      if(!(s instanceof Sprite)) {
        throw('Error: you can only add sprites to a group');
      }
   
      if (-1 === this.indexOf(s)) {
        array.push(s);
        s.groups.push(this);
      }
    };
   
    /**
     * Same as group.length
     * @method size
     */
    array.size = function() {
      return array.length;
    };
   
    /**
    * Removes all the sprites in the group
    * from the scene.
    *
    * @method removeSprites
    */
    array.removeSprites = function() {
      while (array.length > 0) {
        array[0].remove();
      }
    };
   
    /**
    * Removes all references to the group.
    * Does not remove the actual sprites.
    *
    * @method clear
    */
    array.clear = function() {
      array.length = 0;
    };
   
    /**
    * Removes a sprite from the group.
    * Does not remove the actual sprite, only the affiliation (reference).
    *
    * @method remove
    * @param {Sprite} item The sprite to be removed
    * @return {Boolean} True if sprite was found and removed
    */
    array.remove = function(item) {
      if(!(item instanceof Sprite)) {
        throw('Error: you can only remove sprites from a group');
      }
   
      var i, removed = false;
      for (i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
          array.splice(i, 1);
          removed = true;
        }
      }
   
      if (removed) {
        for (i = item.groups.length - 1; i >= 0; i--) {
          if (item.groups[i] === this) {
            item.groups.splice(i, 1);
          }
        }
      }
   
      return removed;
    };
   
    /**
     * Returns a copy of the group as standard array.
     * @method toArray
     */
    array.toArray = function() {
      return array.slice(0);
    };
   
    /**
    * Returns the highest depth in a group
    *
    * @method maxDepth
    * @return {Number} The depth of the sprite drawn on the top
    */
    array.maxDepth = function() {
      if (array.length === 0) {
        return 0;
      }
   
      return array.reduce(function(maxDepth, sprite) {
        return Math.max(maxDepth, sprite.depth);
      }, -Infinity);
    };
   
    /**
    * Returns the lowest depth in a group
    *
    * @method minDepth
    * @return {Number} The depth of the sprite drawn on the bottom
    */
    array.minDepth = function() {
      if (array.length === 0) {
        return 99999;
      }
   
      return array.reduce(function(minDepth, sprite) {
        return Math.min(minDepth, sprite.depth);
      }, Infinity);
    };
   
    /**
    * Draws all the sprites in the group.
    *
    * @method draw
    */
    array.draw = function() {
   
      //sort by depth
      this.sort(function(a, b) {
        return a.depth - b.depth;
      });
   
      for(var i = 0; i<this.size(); i++)
      {
        this.get(i).display();
      }
    };
   
    //internal use
    function virtEquals(obj, other) {
      if (obj === null || other === null) {
        return (obj === null) && (other === null);
      }
      if (typeof (obj) === 'string') {
        return obj === other;
      }
      if (typeof(obj) !== 'object') {
        return obj === other;
      }
      if (obj.equals instanceof Function) {
        return obj.equals(other);
      }
      return obj === other;
    }
   
    /**
     * Collide each member of group against the target using the given collision
     * type.  Return true if any collision occurred.
     * Internal use
     *
     * @private
     * @method _groupCollide
     * @param {!string} type one of 'overlap', 'collide', 'displace', 'bounce'
     * @param {Object} target Group or Sprite
     * @param {Function} [callback] on collision.
     * @return {boolean} True if any collision/overlap occurred
     */
    function _groupCollide(type, target, callback) {
      var didCollide = false;
      for(var i = 0; i<this.size(); i++)
        didCollide = this.get(i).AABBops(type, target, callback) || didCollide;
      return didCollide;
    }
   
    /**
    * Checks if the the group is overlapping another group or sprite.
    * The check is performed using the colliders. If colliders are not set
    * they will be created automatically from the image/animation bounding box.
    *
    * A callback function can be specified to perform additional operations
    * when the overlap occurs.
    * The function will be called for each single sprite overlapping.
    * The parameter of the function are respectively the
    * member of the current group and the other sprite passed as parameter.
    *
    * @example
    *     group.overlap(otherSprite, explosion);
    *
    *     function explosion(spriteA, spriteB) {
    *       spriteA.remove();
    *       spriteB.score++;
    *     }
    *
    * @method overlap
    * @param {Object} target Group or Sprite to check against the current one
    * @param {Function} [callback] The function to be called if overlap is positive
    * @return {Boolean} True if overlapping
    */
    array.overlap = _groupCollide.bind(array, 'overlap');
   
   
    /**
    * Checks if the the group is overlapping another group or sprite.
    * If the overlap is positive the sprites in the group will be displaced
    * by the colliding one to the closest non-overlapping positions.
    *
    * The check is performed using the colliders. If colliders are not set
    * they will be created automatically from the image/animation bounding box.
    *
    * A callback function can be specified to perform additional operations
    * when the overlap occours.
    * The function will be called for each single sprite overlapping.
    * The parameter of the function are respectively the
    * member of the current group and the other sprite passed as parameter.
    *
    * @example
    *     group.collide(otherSprite, explosion);
    *
    *     function explosion(spriteA, spriteB) {
    *       spriteA.remove();
    *       spriteB.score++;
    *     }
    *
    * @method collide
    * @param {Object} target Group or Sprite to check against the current one
    * @param {Function} [callback] The function to be called if overlap is positive
    * @return {Boolean} True if overlapping
    */
    array.collide = _groupCollide.bind(array, 'collide');
   
    /**
    * Checks if the the group is overlapping another group or sprite.
    * If the overlap is positive the sprites in the group will displace
    * the colliding ones to the closest non-overlapping positions.
    *
    * The check is performed using the colliders. If colliders are not set
    * they will be created automatically from the image/animation bounding box.
    *
    * A callback function can be specified to perform additional operations
    * when the overlap occurs.
    * The function will be called for each single sprite overlapping.
    * The parameter of the function are respectively the
    * member of the current group and the other sprite passed as parameter.
    *
    * @example
    *     group.displace(otherSprite, explosion);
    *
    *     function explosion(spriteA, spriteB) {
    *       spriteA.remove();
    *       spriteB.score++;
    *     }
    *
    * @method displace
    * @param {Object} target Group or Sprite to check against the current one
    * @param {Function} [callback] The function to be called if overlap is positive
    * @return {Boolean} True if overlapping
    */
    array.displace = _groupCollide.bind(array, 'displace');
   
    /**
    * Checks if the the group is overlapping another group or sprite.
    * If the overlap is positive the sprites will bounce affecting each
    * other's trajectories depending on their .velocity, .mass and .restitution.
    *
    * The check is performed using the colliders. If colliders are not set
    * they will be created automatically from the image/animation bounding box.
    *
    * A callback function can be specified to perform additional operations
    * when the overlap occours.
    * The function will be called for each single sprite overlapping.
    * The parameter of the function are respectively the
    * member of the current group and the other sprite passed as parameter.
    *
    * @example
    *     group.bounce(otherSprite, explosion);
    *
    *     function explosion(spriteA, spriteB) {
    *       spriteA.remove();
    *       spriteB.score++;
    *     }
    *
    * @method bounce
    * @param {Object} target Group or Sprite to check against the current one
    * @param {Function} [callback] The function to be called if overlap is positive
    * @return {Boolean} True if overlapping
    */
    array.bounce = _groupCollide.bind(array, 'bounce');
   
    return array;
  }
   