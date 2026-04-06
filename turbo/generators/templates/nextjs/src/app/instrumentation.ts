import type { Instrumentation } from 'next';

/**
 * 初始化一个新的 Next.js 服务器实例时调用一次
 *
 */
export function register() {}

/**
 * 服务器处理异常时调用
 */
export const onRequestError: Instrumentation.onRequestError = async (
	_err,
	_request,
	_context,
) => {};
