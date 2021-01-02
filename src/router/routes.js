import { isNumber, isArray } from 'lodash-es';

/** @desc 获取路由模块的方法 */
function loadModules() {
  const moduleFiles = require.context('./modules', true, /\.js$/);
  const modules = {};
  moduleFiles.keys().forEach((key) => {
    const matched = key.match(/([\w-]+)\./i);
    if (matched && matched.length > 1) {
      const moduleName = matched[1];
      modules[moduleName] = moduleFiles(key).default;
    }
  });
  return modules;
}

/** @desc 路由模块 */
const modules = loadModules();

/** @desc 获取静态路由的方法 */
export function loadStaticRoutes() {
  return modules.static;
}

/**
 * @desc 检查指定用户角色有没有指定路由的访问权限
 * @param {*} route 路由
 * @param {number} role 用户角色
 */
function hasPermission(route, role) {
  if (
    isNumber(role) &&
    route.meta &&
    route.meta.roles &&
    isArray(route.meta.roles)
  ) {
    return route.meta.roles.includes(role);
  }
  return true;
}

function filterRoutes(routes, role) {
  const resultRoutes = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route };
    if (hasPermission(tmpRoute, role)) {
      if (tmpRoute.children) {
        tmpRoute.children = filterRoutes(tmpRoute.children, role);
      }
      resultRoutes.push(tmpRoute);
    }
  });
  return resultRoutes;
}

/**
 * @desc 获取动态路由的方法
 * @param {number} role 用户角色
 */
export function loadDynamicRoutes(role) {
  const newModules = { ...modules };
  const exceptionRoutes = newModules.exception;
  delete newModules.static;
  delete newModules.exception;
  const routes = [];
  newModules.keys().forEach((key) => {
    routes.push(...filterRoutes(newModules[key], role));
  });
  routes.push(...exceptionRoutes);
  return routes;
}

export function loadExceptionRoutes() {
  return modules.exception;
}
