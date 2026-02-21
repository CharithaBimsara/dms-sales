import { useState, useCallback } from 'react'
import {
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VISIT_STATUS,
} from '../data/mockData'

/**
 * Central application state hook.
 * Manages: navigation, visit statuses, orders, notifications, toast messages.
 */
export function useAppState() {
  const [screen,   setScreen]   = useState('login')
  const [params,   setParams]   = useState({})
  const [visitSt,  setVisitSt]  = useState(INITIAL_VISIT_STATUS)
  const [orders,   setOrders]   = useState(INITIAL_ORDERS)
  const [notifs,   setNotifs]   = useState(INITIAL_NOTIFICATIONS)
  const [toast,    setToast]    = useState(null)

  /** Navigate to a screen with optional params */
  const go = useCallback((screenName, screenParams = {}) => {
    setScreen(screenName)
    setParams(screenParams)
  }, [])

  /** Show a toast notification for 2.8s */
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }, [])

  /** Prepend a new order to the orders list */
  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  /** Update visit status for a given customer id */
  const updateVisit = useCallback((customerId, status) => {
    setVisitSt((prev) => ({ ...prev, [customerId]: status }))
  }, [])

  /** Mark a single notification as read */
  const markNotifRead = useCallback((id) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  /** Mark all notifications as read */
  const markAllNotifsRead = useCallback(() => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  return {
    screen, params, go,
    visitSt, updateVisit,
    orders, addOrder,
    notifs, markNotifRead, markAllNotifsRead,
    toast, showToast,
  }
}
