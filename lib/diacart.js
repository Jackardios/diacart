(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("diacart", [], factory);
	else if(typeof exports === 'object')
		exports["diacart"] = factory();
	else
		root["diacart"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdatediacart"];
/******/ 	window["webpackHotUpdatediacart"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "cc99156c87d6554a01dd";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/art-template/lib/compile/runtime.js":
/*!**********************************************************!*\
  !*** ./node_modules/art-template/lib/compile/runtime.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*! art-template@runtime | https://github.com/aui/art-template */

var detectNode = typeof window === 'undefined';
var runtime = Object.create(detectNode ? global : window);
var ESCAPE_REG = /["&'<>]/;

/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */
runtime.$escape = function (content) {
    return xmlEscape(toString(content));
};

/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data
 * @param {function}     callback
 */
runtime.$each = function (data, callback) {
    if (Array.isArray(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    } else {
        for (var _i in data) {
            callback(data[_i], _i);
        }
    }
};

// 将目标转成字符
function toString(value) {
    if (typeof value !== 'string') {
        if (value === undefined || value === null) {
            value = '';
        } else if (typeof value === 'function') {
            value = toString(value.call(value));
        } else {
            value = JSON.stringify(value);
        }
    }

    return value;
}

// 编码 HTML 内容
function xmlEscape(content) {
    var html = '' + content;
    var regexResult = ESCAPE_REG.exec(html);
    if (!regexResult) {
        return content;
    }

    var result = '';
    var i = void 0,
        lastIndex = void 0,
        char = void 0;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
        switch (html.charCodeAt(i)) {
            case 34:
                char = '&#34;';
                break;
            case 38:
                char = '&#38;';
                break;
            case 39:
                char = '&#39;';
                break;
            case 60:
                char = '&#60;';
                break;
            case 62:
                char = '&#62;';
                break;
            default:
                continue;
        }

        if (lastIndex !== i) {
            result += html.substring(lastIndex, i);
        }

        lastIndex = i + 1;
        result += char;
    }

    if (lastIndex !== i) {
        return result + html.substring(lastIndex, i);
    } else {
        return result;
    }
}

module.exports = runtime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/art-template/lib/runtime.js":
/*!**************************************************!*\
  !*** ./node_modules/art-template/lib/runtime.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/Diacart.js":
/*!***********************************!*\
  !*** ./src/components/Diacart.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ObjectsLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ObjectsLocalStorage */ "./src/components/ObjectsLocalStorage.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var defaultOptions = {
  // common
  name: 'diacart',
  title: 'Корзина покупок',
  totalPriceText: 'Итоговая сумма',
  totalQuantityText: 'Количество',
  removeFromCartBtnText: 'Удалить',
  orderBtnText: 'Оформить заказ',
  quantitative: true,
  // 'true' or 'false'
  groupBy: 'id',
  // 'null', 'undefined' or false to not group
  // templates
  wrapperTemplate: __webpack_require__(/*! ../templates/diacart-wrapper.art */ "./src/templates/diacart-wrapper.art"),
  // template function
  itemTemplate: __webpack_require__(/*! ../templates/diacart-item.art */ "./src/templates/diacart-item.art"),
  // template function
  totalPriceTemplate: function totalPriceTemplate($data) {
    return parseFloat($data.totalPrice).toFixed(2);
  },
  // template function
  totalQuantityTemplate: function totalQuantityTemplate($data) {
    return parseInt($data.totalQuantity);
  },
  // template function
  // selectors
  containerSelector: '[data-diacart-container]',
  totalPriceContainerSelector: '[data-diacart-total-price-container]',
  totalQuantityContainerSelector: '[data-diacart-total-quantity-container]',
  itemsContainerSelector: '[data-diacart-items-container]',
  itemSelector: '[data-diacart-item]',
  addToCartBtnSelector: '[data-diacart-add-to-cart]',
  removeFromCartBtnSelector: '[data-diacart-remove-from-cart]',
  orderBtnSelector: '[data-diacart-order]',
  // events
  onAdd: function onAdd(f) {
    return f;
  },
  onRemove: function onRemove(f) {
    return f;
  },
  onClear: function onClear(f) {
    return f;
  },
  onOrder: function onOrder(f) {
    return f;
  }
};

var Diacart =
/*#__PURE__*/
function () {
  function Diacart(options) {
    var _this = this;

    _classCallCheck(this, Diacart);

    _defineProperty(this, "add", function () {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!item && console && console.log) {
        console.log("'item' argument is undefined!");
      }

      if (_this._options.quantitative) {
        item.quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

        if (_this._options.groupBy) {
          var query = _defineProperty({}, _this._options.groupBy, item[_this._options.groupBy]);

          var storageItem = _this._groupItemsByQuery(query);

          if (storageItem) {
            _this._storage.update(storageItem.id, {
              quantity: storageItem.obj.quantity + item.quantity
            });
          } else {
            _this._storage.add(item);
          }

          return;
        }
      }

      _this._storage.add(item);

      _this._options.onAdd(item);
    });

    _defineProperty(this, "remove", function (storageItemId) {
      if (!storageItemId) {
        new Error("'id' argument is required");
      }

      _this._storage.removeById(storageItemId);

      _this._options.onRemove(storageItemId);
    });

    _defineProperty(this, "clear", function () {
      _this._storage.clear();

      _this._options.onClear();
    });

    _defineProperty(this, "order", function () {
      _this._options.onOrder();
    });

    _defineProperty(this, "update", function (prevStorage, nextStorage) {
      console.log("UPDATE");

      _this.updateTotalPrice();

      _this.updateTotalQuantity();

      _this.renderCartItems(); // TODO: optimized cart items rerendering

    });

    _defineProperty(this, "updateTotalPrice", function () {
      _this._totalPrice = _this._calculateTotalPrice();

      _this.renderTotalPrice();
    });

    _defineProperty(this, "updateTotalQuantity", function () {
      _this._totalQuantity = _this._calculateTotalQuantity();

      _this.renderTotalQuantity();
    });

    _defineProperty(this, "_itemsTemplate", function (_ref) {
      var itemTemplate = _ref.itemTemplate,
          items = _ref.items,
          quantitative = _ref.quantitative,
          removeFromCartBtnText = _ref.removeFromCartBtnText;
      var compiledHTML = '';
      items.forEach(function (item) {
        compiledHTML += itemTemplate({
          item: item,
          quantitative: quantitative,
          removeFromCartBtnText: removeFromCartBtnText
        });
      });
      return compiledHTML;
    });

    this._options = {};

    for (var key in defaultOptions) {
      this._options[key] = options[key] || defaultOptions[key];
    }

    this.init();
  }

  _createClass(Diacart, [{
    key: "init",
    value: function init() {
      this._storage = new _ObjectsLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"](this._options.name, this.update);
      this._containers = document.querySelectorAll(this._options.containerSelector);
      this.renderCart();
      this._itemsContainer = document.querySelector(this._options.itemsContainerSelector);
      this._totalPriceContainers = document.querySelectorAll(this._options.totalPriceContainerSelector);
      this._totalQuantityContainers = document.querySelectorAll(this._options.totalQuantityContainerSelector);
      this.renderCartItems();
      this.updateTotalQuantity();
      this.updateTotalPrice();

      this._attachEventHandlers();
    }
  }, {
    key: "_attachEventHandlers",
    value: function _attachEventHandlers() {
      var _this2 = this;

      Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_1__["addDelegatedEventListener"])(document, "click", this._options.orderBtnSelector, function () {
        _this2.order();
      });
      Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_1__["addDelegatedEventListener"])(document, "click", this._options.addToCartBtnSelector, function (e) {
        var json = e.target.getAttribute('data-diacart-item-json');
        var item = JSON.parse(json);

        _this2.add(item);
      });

      if (this._itemsContainer) {
        Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_1__["addDelegatedEventListener"])(this._itemsContainer, "click", this._options.removeFromCartBtnSelector, function (e) {
          var id = parseInt(e.target.getAttribute('data-diacart-item-id'));

          _this2.remove(id);
        });
      }
    }
  }, {
    key: "_groupItemsByQuery",
    value: function _groupItemsByQuery() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (query) {
        var groupItems = this._storage.findByQuery(query);

        if (groupItems.length) {
          var mainItem = groupItems[0];

          if (groupItems.length > 1) {
            var quantity = 0;

            for (var i = 0; i < groupItems.length; i++) {
              if (groupItems[i].obj) {
                quantity += groupItems[i].obj.quantity ? parseInt(groupItems[i].obj.quantity) : 1;
              }
            }

            mainItem.obj.quantity = quantity;

            this._storage.removeByQuery(query);

            this._storage.add(mainItem.obj);
          }

          return mainItem;
        }
      }

      return null;
    }
  }, {
    key: "_calculateTotalQuantity",
    value: function _calculateTotalQuantity() {
      var totalQuantity = 0;

      if (this._options.quantitative) {
        this._storage.storage.forEach(function (item) {
          totalQuantity += item.obj.quantity ? parseInt(item.obj.quantity) : 1;
        });
      }

      return totalQuantity;
    }
  }, {
    key: "_calculateTotalPrice",
    value: function _calculateTotalPrice() {
      var totalPrice = 0;

      if (this._options.quantitative) {
        this._storage.storage.forEach(function (item) {
          var quantity = item.obj.quantity ? parseInt(item.obj.quantity) : 1;
          totalPrice += (item.obj.price ? parseFloat(item.obj.price) : 0) * quantity;
        });
      }

      return totalPrice;
    }
  }, {
    key: "_renderTemplateToContainers",
    value: function _renderTemplateToContainers(containers, template, data) {
      if (containers && containers.length) {
        var compiledHTML = template(data);

        for (var i = 0; i < containers.length; ++i) {
          if (containers[i]) {
            containers[i].innerHTML = compiledHTML;
          }
        }
      }
    }
  }, {
    key: "renderCart",
    value: function renderCart() {
      var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._containers;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._options.wrapperTemplate;

      this._renderTemplateToContainers(containers, template, {
        title: this._options.title,
        totalPriceText: this._options.totalPriceText,
        totalQuantityText: this._options.totalQuantityText,
        totalPrice: this._totalPrice,
        totalQuantity: this._totalQuantity,
        quantitative: this._options.quantitative,
        removeFromCartBtnText: this._options.removeFromCartBtnText,
        orderBtnText: this._options.orderBtnText
      });
    }
  }, {
    key: "renderCartItems",
    value: function renderCartItems() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._itemsContainer;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._options.itemTemplate;

      this._renderTemplateToContainers([container], this._itemsTemplate, {
        itemTemplate: template,
        items: this._storage.storage,
        quantitative: this._options.quantitative,
        removeFromCartBtnText: this._options.removeFromCartBtnText
      });
    }
  }, {
    key: "renderTotalPrice",
    value: function renderTotalPrice() {
      var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._totalPriceContainers;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._options.totalPriceTemplate;

      this._renderTemplateToContainers(containers, template, {
        totalPrice: this._totalPrice
      });
    }
  }, {
    key: "renderTotalQuantity",
    value: function renderTotalQuantity() {
      var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._totalQuantityContainers;
      var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._options.totalQuantityTemplate;

      this._renderTemplateToContainers(containers, template, {
        totalQuantity: this._totalQuantity
      });
    }
  }]);

  return Diacart;
}();

/* harmony default export */ __webpack_exports__["default"] = (Diacart);

/***/ }),

/***/ "./src/components/ObjectsLocalStorage.js":
/*!***********************************************!*\
  !*** ./src/components/ObjectsLocalStorage.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class representing a objects storage.
 * Класс, представляющий хранилище объектов
 */
var ObjectsLocalStorage =
/*#__PURE__*/
function () {
  /**
   * @param {!string} name - Storage name
   */
  function ObjectsLocalStorage(name) {
    var _this = this;

    var onStorageUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (prevStorage, nextStorage) {
      return null;
    };

    _classCallCheck(this, ObjectsLocalStorage);

    if (!name) {
      throw new Error('Missing required parameter "name"');
    }

    this._storageName = name;
    this._onStorageUpdate = onStorageUpdate; // Synchronization between multiple tabs

    window.addEventListener('storage', function (event) {
      if (event.key === _this._storageName) {
        var prevStorage = _this._storage;
        _this._storage = JSON.parse(event.newValue || '[]');

        _this._onStorageUpdate(prevStorage, _this._storage);
      }
    }, false);
  }

  _createClass(ObjectsLocalStorage, [{
    key: "getLastId",

    /**
     * Get the ID of the last object in the storage.
     * Получить идентификатор последнего объекта в хранилище.
     *
     * @return {number} ID of the last object in the storage
     */
    value: function getLastId() {
      var lastObj = this.storage[this.storage.length - 1];
      return lastObj ? lastObj.id : 0;
    }
    /**
     * Find objects with properties matching those on query.
     * Найти объекты со свойствами, соответствующими свойствам запроса.
     *
     * @param {Object} query - Query to match
     * @return {Object[]} Array of found objects
     * 
     * @example
     * storage.findByQuery({foo: 'bar' baz: 200})
     */

  }, {
    key: "findByQuery",
    value: function findByQuery(query) {
      if (query) {
        return this.storage.filter(function (storageItem) {
          for (var key in query) {
            if (query[key] !== storageItem['obj'][key]) {
              return false;
            }
          }

          return true;
        });
      }

      return [];
    }
    /**
     * Find object by the ID.
     * Найти объект по ID.
     *
     * @param {number} id - ID of the object
     * @return {Object} Found object or 'null' if it was not found
     */

  }, {
    key: "findById",
    value: function findById(id) {
      return this.storage.find(function (storageItem) {
        return storageItem['id'] === id;
      })['obj'];
    }
    /**
     * add an object into the storage.
     * Вставить объект в хранилище.
     *
     * @param {Object} obj - The object to be added into the storage
     * @return {Object} - The added storage object or null
     */

  }, {
    key: "add",
    value: function add(obj) {
      if (!obj) {
        return null;
      }

      var storage = this.storage;
      var cartItem = {
        id: this.getLastId() + 1,
        obj: obj
      };
      storage.push(cartItem);
      this.storage = storage;
      return cartItem;
    }
    /**
     * Update an object in storage by the ID
     * Обновить объект в хранилище по ID .
     *
     * @param {number} id - ID of the object being updated
     * @param {Object} updateObj - The object whose properties will be merged with the found object
     * @return {Object} The updated storage object or null
     * 
     * @example
     * storage.update(1, {foo: 'bar', baz: 1})
     */

  }, {
    key: "update",
    value: function update(id, updateObj) {
      if (id && updateObj) {
        var storage = this.storage;
        var item;

        for (var i = 0; i < storage.length; ++i) {
          if (storage[i]['id'] === id) {
            item = Object.assign({}, storage[i]['obj'], updateObj);
            storage[i]['obj'] = item;
            this.storage = storage;
            return item;
          }
        }
      }

      return null;
    }
    /**
     * Remove objects from storage based on a id
     * Удалить объекты из хранилища по ID.
     *
     * @param {number} id - ID
     * @return {boolean} The status of the operation
     * @return {Object} The removed storage object or null
     */

  }, {
    key: "removeById",
    value: function removeById(id) {
      var storage = this.storage;

      for (var i = 0; i < storage.length; ++i) {
        if (storage[i]['id'] === id) {
          var item = storage[i];
          storage.splice(i, 1);
          this.storage = storage;
          return item;
        }
      }

      return null;
    }
    /**
     * Remove objects from storage based on a query
     * Удалить объекты из хранилища по запросу.
     *
     * @param {Object} query - Query to match
     * @return {boolean} The status of the operation 
     * 
     * @example
     * storage.removeByQuery({foo: 'bar', baz: 1})
     */

  }, {
    key: "removeByQuery",
    value: function removeByQuery(query) {
      if (query) {
        var storage = this.storage.filter(function (storageItem) {
          for (var key in query) {
            if (query[key] !== storageItem['obj'][key]) {
              return true;
            }
          }

          return false;
        });
        this.storage = storage;
        return true;
      }

      return false;
    }
    /**
     * Remove all objects from the storage.
     * Удалить все объекты из хранилища.
     *
     * @return {boolean} The status of the operation 
     */

  }, {
    key: "clear",
    value: function clear() {
      this.storage = [];
      return true;
    }
    /**
     * Get total count of objects in storage.
     * Получить общее количество объектов в хранилище.
     *
     * @return {number} Total count of objects in storage
     */

  }, {
    key: "count",
    value: function count() {
      return this.storage.length;
    }
  }, {
    key: "storage",
    get: function get() {
      if (!this._storage) {
        var prevStorage = this._storage;
        this._storage = JSON.parse(localStorage.getItem(this._storageName) || '[]');

        this._onStorageUpdate(prevStorage, this._storage);
      }

      return this._storage;
    },
    set: function set(newStorage) {
      var prevStorage = this._storage;
      this._storage = newStorage;
      localStorage.setItem(this._storageName, JSON.stringify(this._storage));

      this._onStorageUpdate(prevStorage, this._storage);
    }
  }]);

  return ObjectsLocalStorage;
}();

/* harmony default export */ __webpack_exports__["default"] = (ObjectsLocalStorage);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _polyfills_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfills/object-assign */ "./src/polyfills/object-assign.js");
/* harmony import */ var _polyfills_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_polyfills_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _polyfills_matches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polyfills/matches */ "./src/polyfills/matches.js");
/* harmony import */ var _polyfills_matches__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_polyfills_matches__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Diacart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Diacart */ "./src/components/Diacart.js");
// styles
 // polyfills


 // components


/* harmony default export */ __webpack_exports__["default"] = (_components_Diacart__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./src/polyfills/matches.js":
/*!**********************************!*\
  !*** ./src/polyfills/matches.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (e) {
  var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
  !matches ? e.matches = e.matchesSelector = function matches(selector) {
    var matches = document.querySelectorAll(selector);
    var th = this;
    return Array.prototype.some.call(matches, function (e) {
      return e === th;
    });
  } : e.matches = e.matchesSelector = matches;
})(Element.prototype);

/***/ }),

/***/ "./src/polyfills/object-assign.js":
/*!****************************************!*\
  !*** ./src/polyfills/object-assign.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target, firstSource) {
      'use strict';

      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);

      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];

        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));

        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }

      return to;
    }
  });
}

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/templates/diacart-item.art":
/*!****************************************!*\
  !*** ./src/templates/diacart-item.art ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/art-template/lib/runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $escape = $imports.$escape;
    $$out += '<div class="diacart-item" data-diamodal-item data-diacart-item-id="';
    $$out += $escape($data.item.id || '');
    $$out += '">\n  <div class="diacart-item__name">';
    $$out += $escape($data.item.obj.name || '');
    $$out += '</div>\n  ';
    if ($data.item.obj.price) {
        $$out += '\n    <div class="diacart-item__price">';
        $$out += $escape($data.item.obj.price || '');
        $$out += '</div>\n  ';
    }
    $$out += '\n  ';
    if ($data.quantitative) {
        $$out += '\n    <div class="diacart-item__quantity">';
        $$out += $escape($data.item.obj.quantity || '');
        $$out += '</div>\n  ';
    }
    $$out += '\n  <div class="diacart-item__buttons">\n    <button class="diacart-item__remove-btn diacart-btn diacart-btn--medium diacart-btn--error"\n      data-diacart-remove-from-cart data-diacart-item-id="';
    $$out += $escape($data.item.id || '');
    $$out += '">';
    $$out += $escape($data.removeFromCartBtnText || '');
    $$out += '</button>\n  </div>\n</div>';
    return $$out;
};

/***/ }),

/***/ "./src/templates/diacart-wrapper.art":
/*!*******************************************!*\
  !*** ./src/templates/diacart-wrapper.art ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/art-template/lib/runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $escape = $imports.$escape;
    $$out += '<section class="diacart">\n  <div class="diacart__header">\n    <div class="diacart__title">';
    $$out += $escape($data.title || '');
    $$out += '</div>\n  </div>\n  <div class="diacart__items" data-diacart-items-container></div>\n  <div class="diacart__footer">\n    <div class="diacart__total-price">';
    $$out += $escape($data.totalPriceText ? $data.totalPriceText + ': ' : '');
    $$out += '<span data-diacart-total-price-container></span></div>\n    <button class="diacart-btn diacart-btn--primary diacart-btn--medium" data-diacart-order>';
    $$out += $escape($data.orderBtnText || '');
    $$out += '</button>\n  </div>\n</section>';
    return $$out;
};

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/*! exports provided: generateUID, createElementFromHTML, addClass, removeClass, ready, addDelegatedEventListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUID", function() { return generateUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElementFromHTML", function() { return createElementFromHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return ready; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDelegatedEventListener", function() { return addDelegatedEventListener; });
function generateUID() {
  return '_' + Math.random().toString(14).substr(2, 6);
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

  return div.firstChild;
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);else el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function addDelegatedEventListener(element, eventName, selector, handler) {
  element.addEventListener(eventName, function (e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      // loop parent nodes from the target to the delegation node
      if (target.matches(selector)) {
        handler.call(target, e);
        break;
      }
    }
  }, false);
}



/***/ })

/******/ });
});
//# sourceMappingURL=diacart.js.map