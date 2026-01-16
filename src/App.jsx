/**
 * ═══════════════════════════════════════════════════════════════════════════
 * RT TRAINING NAS 410 - Digital Radiography Training System
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Copyright © 2024-2026 Stefano Battisti - RT Training. All Rights Reserved.
 * 
 * PROPRIETARY AND CONFIDENTIAL
 * 
 * This software and its documentation are proprietary to Stefano Battisti.
 * Unauthorized copying, modification, distribution, reverse engineering, 
 * decompilation, or any other use of this software, in whole or in part, 
 * without the express written permission of the copyright holder is 
 * strictly prohibited.
 * 
 * This software is protected by copyright law and international treaties.
 * Violators will be prosecuted to the maximum extent possible under the law.
 * 
 * Contact: rttraining.contact@gmail.com
 * 
 * Version: 1.0.0-beta
 * Build Date: January 2026
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Camera, ZoomIn, ZoomOut, Maximize2, Filter, RefreshCw, Play, BookOpen, ClipboardCheck, ChevronDown, ChevronUp, Eye, EyeOff, Undo, Redo, MousePointer, Ruler, Circle, Square, BarChart3, TrendingUp, Layers, LogOut, Users, Award, Download, Settings, Globe, Menu, X, FileText, CheckCircle, AlertCircle, Trash2, MessageSquare, Bug, Lightbulb, Send, RotateCcw, Clock, CreditCard, Zap, Timer, ShoppingCart, Gift, Star, Shield, Scale } from 'lucide-react';

// Company Logo (Base64)
const COMPANY_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADGCAIAAAAYMFi5AAABAGlDQ1BpY2MAABiVY2BgPMEABCwGDAy5eSVFQe5OChGRUQrsDxgYgRAMEpOLCxhwA6Cqb9cgai/r4lGHC3CmpBYnA+kPQKxSBLQcaKQIkC2SDmFrgNhJELYNiF1eUlACZAeA2EUhQc5AdgqQrZGOxE5CYicXFIHU9wDZNrk5pckIdzPwpOaFBgNpDiCWYShmCGJwZ3AC+R+iJH8RA4PFVwYG5gkIsaSZDAzbWxkYJG4hxFQWMDDwtzAwbDuPEEOESUFiUSJYiAWImdLSGBg+LWdg4I1kYBC+wMDAFQ0LCBxuUwC7zZ0hHwjTGXIYUoEingx5DMkMekCWEYMBgyGDGQCm1j8/yRb+6wAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH6gEIEhoALFAe3gAAa6FJREFUeNrt/eeTZMeRLwq6R8TRqbO06K7WQKOhQWitCU1NDjna3t2xZ/ve+xfup7X9tB92bW1t7e7duXdmMCQHkgAJUGIAkAAIrdFal65KnSePigh/H05miUYDBLqru1EAfpYGdGVXH+HHj4eHi58jEcHZAAFoAPzY93iyL7/Gugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwdeK9TXOCL5WrK9xRvC1Yn2NMwJxJg9OAOmWE3t/+PgO9Ost4ZcTp6NYPS2h1crR+4mIAAgRVqjX1/iq4JQUq6snBEBESAQMEYBAEzEEAurZKgTohckQ8euQ1VcIp2GxCABBa9KKAEHGMSdinq1Aaa0RkQNLtQ+A/pJWfUqQ9mtdXJc4VcWi7hNHQKYhbPvTx47YnjkwMYqCI4BAAQAEhJ+qNSsOd1L362utWq841V0hLq1wgAzb7fZ77775u98+e+zgfhV1BEvVSSNoQP2XVGvpb3HF52usb5yaxSIASnULEZCDpujIsQMvv/yiYtEdd989umETRwQUwHiqJUSpF//JR/tamU7Eyvdt/eHULNYKC4QIDBC1Up3pqQO/fvqJl577fXN+WssYUKfKRB/bOH6NzwD6TE7EFxWnpFi4tBRiN0aFEjCRSef44X2/fPLR5//w23atgkRAhIAIHIEBAfU+X+Oz4VxKik5PtU8n8r7kDBGgAkwA4sBvHj6w9xePPfqnF5+vzM1qpdJAAyLQiov9WrfWBU5HsU4tjtVTqWW/KS23IgY68tu7P3j30Z8zDeyaG24tDYwwYXVN3Fc7UEorYno9oS09uJVv+JlaBPWyJUhPSR/bOZ14Eaf8rE7NecePnRMBGANmcME0U3G454P3fmU9Kji/9qbb86VBAkaMU096DFYZLfxSq9rKxJYiUEoJzjhD0AqAADkBEihKJdETBa61X6oJNAAgsO6jIw3EgIiASGsARM4QsRv4XqHap3Qda5IrRAAGxBEYB86BGIIM/fffft0yzKyTueKaG+1cIc3vIAECfnW0KsVKS80YQ0y1SgMiUHfbvCwVugc71xfwNb6c+FqxvsYZwf8H";

// Copyright and Legal Info
const CURRENT_YEAR = new Date().getFullYear();
const COPYRIGHT_OWNER = "Stefano Battisti - RT Training";
const COPYRIGHT_TEXT = `© ${CURRENT_YEAR} ${COPYRIGHT_OWNER}. All rights reserved.`;
const CONTACT_EMAIL = "rttraining.contact@gmail.com";
const APP_VERSION = "1.0.0-beta";

// Storage Helper
const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { key, value } : null;
    } catch (err) {
      console.error('Storage get error:', err);
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (err) {
      console.error('Storage set error:', err);
      return null;
    }
  },
  async delete(key) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch (err) {
      console.error('Storage delete error:', err);
      return null;
    }
  }
};

// Language Context
const LanguageContext = createContext();
const translations = {
  en: {
    title: "Digital Radiography RT Simulator",
    subtitle: "NAS 410 Training System - Level 1 & 2",
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    username: "Username",
    role: "Role",
    admin: "Administrator",
    trainer: "Trainer",
    student: "Student",
    dashboard: "Dashboard",
    simulator: "Simulator",
    certificates: "Certificates",
    statistics: "Statistics",
    teaching: "Teaching Mode",
    learning: "Learning Mode",
    exam: "Exam Mode",
    teachingDesc: "View optimal images with highlighted defects",
    learningDesc: "Practice identifying defects with instant feedback",
    examDesc: "Test your skills without assistance",
    start: "Start",
    evaluate: "Evaluate",
    generate: "Generate",
    download: "Download",
    material: "Material",
    thickness: "Thickness",
    voltage: "Voltage (kV)",
    current: "Current (mA)",
    defects: "Defects",
    detected: "Detected",
    falsePositives: "False Positives",
    score: "Score",
    passed: "PASSED",
    failed: "FAILED",
    users: "Users",
    exams: "Exams",
    avgScore: "Average Score",
    activeUsers: "Active Users",
    totalExams: "Total Exams",
    examHistory: "Exam History",
    date: "Date",
    result: "Result",
    students: "Students",
    studentsOverview: "Students Overview",
    studentProgress: "Student Progress",
    lastExam: "Last Exam",
    trend: "Trend",
    noExams: "No exams yet",
    improving: "Improving",
    stable: "Stable",
    declining: "Declining",
    exportDatabase: "Export Database",
    importDatabase: "Import Database",
    clearDatabase: "Clear Database",
    confirmClear: "Are you sure? This will delete all data!",
    databaseManagement: "Database Management",
    dataExported: "Data exported successfully",
    dataImported: "Data imported successfully",
    dataCleared: "Database cleared",
    certificateTitle: "TRAINING CERTIFICATE",
    certificateBody: "This is to certify that",
    certificateCompletion: "has successfully completed the training in",
    certificateTraining: "Industrial Radiography - Defect Detection",
    certificateDate: "Date",
    certificateScore: "Final Score",
    certificateDisclaimer1: "Valid for training purposes only",
    certificateDisclaimer2: "Not valid for official certification",
    certificateDownload: "Download PDF",
    certificateNone: "No certificates yet",
    certificateEarn: "Complete exams with a score ≥80% to earn certificates",
    certificateEarned: "Certificates Earned",
    certificateMaterial: "Material",
    certificateThickness: "Thickness",
    aluminium: "Aluminium (Al)",
    titanium: "Titanium (Ti)",
    inconel: "Inconel (Ni-Cr)",
    newComponent: "New Component",
    showHints: "Show Defect Indicators",
    dragToMark: "Drag to select defect area. Selected:",
    crack: "Crack",
    porosity: "Porosity",
    cluster: "Cluster",
    inclusion: "Inclusion",
    cavity: "Cavity",
    selectDefectType: "Select defect type:",
    confirm: "Confirm",
    cancel: "Cancel",
    defectMarked: "Defect marked",
    correctType: "Correct type",
    wrongType: "Wrong type",
    imageProcessing: "Image Processing",
    brightness: "Brightness",
    contrast: "Contrast",
    ddaCalibration: "DDA Calibration",
    offsetCorrection: "Offset Correction",
    gainCorrection: "Gain Correction",
    badPixelCorrection: "Bad Pixel Correction",
    applyCalibration: "Apply Calibration",
    resetCalibration: "Reset",
    calibrationApplied: "Calibration Applied",
    autoCalibrate: "Auto Calibrate",
    detectorType: "Detector Type",
    crSystem: "CR (Computed Radiography)",
    ddaSystem: "DDA (Digital Detector Array)",
    iqi: "IQI (Image Quality Indicator)",
    iqi_none: "None",
    iqi_iso: "ISO 19232-1 (Wire Type)",
    iqi_astm: "ASTM E1025 (Hole Type)",
    iqi_duplex: "ISO 19232-5 (Duplex)",
    srb: "SRb (Spatial Resolution)",
    duplexVisible: "Last visible element",
    duplexOrientation: "H/V Orientation",
    wireVisible: "Wires visible",
    wiresVisibleCount: "Visible wires",
    holeVisible: "Holes visible",
    feedback: "Feedback",
    reportProblem: "Report a Problem",
    requestFeature: "Request a Feature",
    feedbackTitle: "Send Feedback",
    feedbackDescription: "Description",
    feedbackEmail: "Your email (optional)",
    feedbackSend: "Send",
    feedbackCancel: "Cancel",
    feedbackSent: "Feedback sent! Thank you.",
    feedbackProblem: "Problem Report",
    feedbackFeature: "Feature Request",
    showIdealParams: "Show Ideal Parameters",
    idealParameters: "Ideal Parameters",
    idealKV: "Recommended kV",
    idealMA: "Recommended mA",
    exposureTime: "Exposure Time",
    sfd: "Source-Film Distance",
    currentSettings: "Current Settings",
    quality: "Image Quality",
    optimal: "Optimal",
    acceptable: "Acceptable",
    suboptimal: "Suboptimal",
    overexposed: "Overexposed",
    underexposed: "Underexposed",
    deleteSelection: "Delete",
    drawingHint: "Click and drag to draw a selection area",
    mouseControlsHint: "Mouse wheel: Zoom | Right-click drag: Brightness (vertical) / Contrast (horizontal)",
    reviewExam: "Review",
    reviewExamTitle: "Exam Review",
    yourSelections: "Your Selections",
    actualDefects: "Actual Defects",
    correct: "Correct",
    incorrect: "Incorrect",
    missed: "Missed",
    closeReview: "Close Review",
    detectorType: "Detector Type",
    detectorCR: "CR (Computed Radiography)",
    detectorDDA: "DDA (Digital Detector Array)",
    crDescription: "Phosphor plate - Higher latitude, more noise",
    ddaDescription: "Flat panel - Linear response, less noise",
    iqiType: "IQI Type",
    iqiNone: "None",
    iqiISO: "ISO 19232-1 (Wire Type)",
    iqiASTM: "ASTM E1025 (Hole Type)",
    iqiVisible: "IQI Visibility",
    wireVisible: "Visible wire",
    wiresVisibleCount: "Visible wires",
    holeVisible: "Visible hole",
    showIdealParams: "Show Ideal Parameters",
    idealParameters: "Ideal Parameters",
    idealParamsDescription: "Recommended exposure settings for this material/thickness",
    currentParams: "Current",
    idealParams: "Ideal",
    parameterMatch: "Parameter Match",
    exposureQuality: "Exposure Quality",
    changelog: "Changelog",
    changelogTitle: "Version History",
    version: "Version",
    trainingTime: "Training Time",
    totalTrainingTime: "Total Training Time",
    sessionTime: "Session Time",
    hours: "h",
    minutes: "m",
    seconds: "s",
    invertPolarity: "Invert Polarity",
    polarityNormal: "Normal",
    polarityInverted: "Inverted",
    // Single Session
    singleSession: "Single Session",
    singleSessionTitle: "Intensive RT Session",
    singleSessionSubtitle: "2 hours of complete access",
    singleSessionPrice: "€9.90",
    singleSessionDuration: "2 hours",
    singleSessionBuy: "Start Now",
    singleSessionActivate: "Activate Session",
    singleSessionActive: "Session Active",
    singleSessionExpired: "Session Expired",
    singleSessionRemaining: "Time Remaining",
    singleSessionFeatures: "What's included",
    singleSessionFeature1: "All 3 modes: Teaching, Learning, Exam",
    singleSessionFeature2: "All defect types",
    singleSessionFeature3: "All materials",
    singleSessionFeature4: "Downloadable certificate",
    singleSessionNoSave: "Progress not saved",
    singleSessionActivateNow: "Start your 2 hours now?",
    singleSessionActivateWarning: "Once activated, the timer cannot be paused",
    singleSessionConfirmActivate: "Yes, Start Now",
    singleSessionLater: "Later",
    singleSessionTimeWarning: "You have {minutes} minutes remaining",
    singleSessionUpgradeOffer: "Want more time? Get 20% off Standard!",
    singleSessionUpgrade: "Upgrade to Standard",
    singleSessionBuyAnother: "Buy Another Session",
    singleSessionExpiredMessage: "Your session has ended",
    singleSessionCode: "Access Code",
    singleSessionEnterCode: "Enter your access code",
    singleSessionInvalidCode: "Invalid or expired code",
    singleSessionOrLogin: "Or login with account",
    tryFree: "Try Free",
    freeTrialInfo: "15 minutes free trial",
    subscriptionPlans: "Subscription Plans",
    standardPlan: "Standard",
    professionalPlan: "Professional",
    enterprisePlan: "Enterprise",
    perMonth: "/month",
    perYear: "/year",
    popular: "Popular",
    currentPlan: "Current Plan",
    // Learning Progress
    learningProgress: "Progress",
    defectsFound: "Defects found",
    correct: "Correct",
    wrongType: "Wrong type",
    falsePositives: "False positives",
    missed: "Missed",
    showCorrection: "Show Correction",
    hideCorrection: "Hide Correction",
    missedDefects: "Missed defects",
    allDefectsFound: "All defects found!",
    // Demo & Beta
    freeDemo: "Free Demo",
    freeDemoDesc: "Try the simulator for 15 minutes",
    free: "FREE",
    betaAccess: "BETA ACCESS",
    fullAccess: "Full simulator access",
    betaFreeAccess: "Free Beta Access",
    betaFreeAccessDesc: "No payment required during beta testing",
    activating: "Activating...",
    getAccess: "Get Access",
    back: "Back",
    accessGranted: "Access Granted!",
    sessionReadyToActivate: "Your session is ready to be activated.",
    sevenDaysToStart: "You have 7 days to start.",
    enterEmail: "Enter your email",
    receiveCode: "You will receive the access code",
    // Feedback
    feedbackCopied: "Feedback copied to clipboard!",
    feedbackEmailTo: "Send feedback to",
    feedbackProblemPlaceholder: "Describe the problem encountered, steps to reproduce it and expected behavior...",
    feedbackFeaturePlaceholder: "Describe the feature you would like to see added...",
    selectedArea: "Selected area",
    detectedOf: "Detected",
    thanksForUsing: "Thanks for using RT Training!",
    chooseHowToContinue: "Choose how to continue:",
    newSession: "New Session",
    getAnotherTwoHours: "Get another 2 hours of access",
    tryFreeDemo: "Try Free Demo (15 min)",
    close: "Close",
    // Time tracking
    totalTimeInApp: "Total Time in App",
    sessionStarted: "Session started",
    // Login screen
    alreadyHaveAccount: "Already have an account? Login",
    needAccount: "Need an account? Register",
    demoAccounts: "Demo Accounts",
    certificateSubscriptionOnly: "Certificate available only with subscription",
    // Demo & Single Session Restrictions
    examDisabledDemo: "Exam mode available with full session",
    moreMaterialsWithPro: "More materials with full session",
    moreIqiWithPro: "Advanced IQI with full session",
    moreDefectsWithPro: "More defect types with full session",
    examsUsed: "Exams",
    examLimitReached: "Exam limit reached",
    examCompleted: "Exam Completed!",
    examsRemaining: "Exams remaining in this session",
    noExamsRemaining: "You have used all exams in this session",
    withSubscription: "With subscription you get",
    unlimitedExams: "Unlimited exams",
    savedProgress: "Permanently saved progress",
    downloadableCertificates: "Downloadable certificates",
    detailedStats: "Detailed statistics",
    continuePractice: "Continue",
    viewPlans: "View Plans",
    subscriptionComingSoon: "Subscriptions available after beta test!",
    // Terms of Service
    termsOfService: "Terms of Service",
    acceptTerms: "I Accept the Terms",
    decline: "Decline"
  },
  it: {
    title: "Simulatore Radiografia Digitale RT",
    subtitle: "Sistema Training NAS 410 - Livello 1 & 2",
    login: "Accedi",
    logout: "Esci",
    email: "Email",
    password: "Password",
    username: "Nome utente",
    role: "Ruolo",
    admin: "Amministratore",
    trainer: "Formatore",
    student: "Studente",
    dashboard: "Pannello",
    simulator: "Simulatore",
    certificates: "Certificati",
    statistics: "Statistiche",
    teaching: "Modalità Insegnamento",
    learning: "Modalità Apprendimento",
    exam: "Modalità Esame",
    teachingDesc: "Visualizza immagini ottimali con difetti evidenziati",
    learningDesc: "Esercitati a identificare i difetti con feedback immediato",
    examDesc: "Testa le tue competenze senza assistenza",
    start: "Inizia",
    evaluate: "Valuta",
    generate: "Genera",
    download: "Scarica",
    material: "Materiale",
    thickness: "Spessore",
    voltage: "Tensione (kV)",
    current: "Corrente (mA)",
    defects: "Difetti",
    detected: "Rilevati",
    falsePositives: "Falsi Positivi",
    score: "Punteggio",
    passed: "SUPERATO",
    failed: "NON SUPERATO",
    users: "Utenti",
    exams: "Esami",
    avgScore: "Punteggio Medio",
    activeUsers: "Utenti Attivi",
    totalExams: "Esami Totali",
    examHistory: "Storico Esami",
    date: "Data",
    result: "Risultato",
    students: "Studenti",
    studentsOverview: "Panoramica Studenti",
    studentProgress: "Progresso Studenti",
    lastExam: "Ultimo Esame",
    trend: "Trend",
    noExams: "Nessun esame",
    improving: "In miglioramento",
    stable: "Stabile",
    declining: "In calo",
    exportDatabase: "Esporta Database",
    importDatabase: "Importa Database",
    clearDatabase: "Cancella Database",
    confirmClear: "Sei sicuro? Tutti i dati verranno eliminati!",
    databaseManagement: "Gestione Database",
    dataExported: "Dati esportati con successo",
    dataImported: "Dati importati con successo",
    dataCleared: "Database cancellato",
    certificateTitle: "CERTIFICATO DI FORMAZIONE",
    certificateBody: "Si certifica che",
    certificateCompletion: "ha completato con successo la formazione in",
    certificateTraining: "Radiografia Industriale - Rilevamento Difetti",
    certificateDate: "Data",
    certificateScore: "Punteggio Finale",
    certificateDisclaimer1: "Valido solo per scopi formativi",
    certificateDisclaimer2: "Non valido per certificazione ufficiale",
    certificateDownload: "Scarica PDF",
    certificateNone: "Nessun certificato",
    certificateEarn: "Completa esami con punteggio ≥80% per ottenere certificati",
    certificateEarned: "Certificati Ottenuti",
    certificateMaterial: "Materiale",
    certificateThickness: "Spessore",
    aluminium: "Alluminio (Al)",
    titanium: "Titanio (Ti)",
    inconel: "Inconel (Ni-Cr)",
    newComponent: "Nuovo Componente",
    showHints: "Mostra Indicatori Difetti",
    dragToMark: "Trascina per selezionare area difetto. Selezionati:",
    crack: "Cricca",
    porosity: "Porosità",
    cluster: "Cluster",
    inclusion: "Inclusione",
    cavity: "Cavità",
    selectDefectType: "Seleziona tipo difetto:",
    confirm: "Conferma",
    cancel: "Annulla",
    defectMarked: "Difetti marcati",
    correctType: "Tipo corretto",
    wrongType: "Tipo errato",
    imageProcessing: "Elaborazione Immagine",
    brightness: "Luminosità",
    contrast: "Contrasto",
    ddaCalibration: "Calibrazione DDA",
    offsetCorrection: "Correzione Offset",
    gainCorrection: "Correzione Gain",
    badPixelCorrection: "Correzione Bad Pixel",
    applyCalibration: "Applica Calibrazione",
    resetCalibration: "Reset",
    calibrationApplied: "Calibrazione Applicata",
    autoCalibrate: "Auto Calibra",
    detectorType: "Tipo Rivelatore",
    crSystem: "CR (Radiografia Computerizzata)",
    ddaSystem: "DDA (Rivelatore Digitale)",
    iqi: "IQI (Indicatore Qualità Immagine)",
    iqi_none: "Nessuno",
    iqi_iso: "ISO 19232-1 (Fili)",
    iqi_astm: "ASTM E1025 (Fori)",
    iqi_duplex: "ISO 19232-5 (Duplex)",
    srb: "SRb (Risoluzione Spaziale)",
    duplexVisible: "Ultimo elemento visibile",
    duplexOrientation: "Orientamento H/V",
    wireVisible: "Filo visibile",
    wiresVisibleCount: "Fili visibili",
    holeVisible: "Fori visibili",
    feedback: "Feedback",
    reportProblem: "Segnala un Problema",
    requestFeature: "Richiedi Funzionalità",
    feedbackTitle: "Invia Feedback",
    feedbackDescription: "Descrizione",
    feedbackEmail: "La tua email (opzionale)",
    feedbackSend: "Invia",
    feedbackCancel: "Annulla",
    feedbackSent: "Feedback inviato! Grazie.",
    feedbackProblem: "Segnalazione Problema",
    feedbackFeature: "Richiesta Funzionalità",
    showIdealParams: "Mostra Parametri Ideali",
    idealParameters: "Parametri Ideali",
    idealKV: "kV Raccomandati",
    idealMA: "mA Raccomandati",
    exposureTime: "Tempo Esposizione",
    sfd: "Distanza Sorgente-Film",
    currentSettings: "Impostazioni Attuali",
    quality: "Qualità Immagine",
    optimal: "Ottimale",
    acceptable: "Accettabile",
    suboptimal: "Subottimale",
    overexposed: "Sovraesposta",
    underexposed: "Sottoesposta",
    deleteSelection: "Elimina",
    drawingHint: "Clicca e trascina per disegnare un'area di selezione",
    mouseControlsHint: "Rotella: Zoom | Tasto destro trascinando: Luminosità (verticale) / Contrasto (orizzontale)",
    reviewExam: "Rivedi",
    reviewExamTitle: "Revisione Esame",
    yourSelections: "Le Tue Selezioni",
    actualDefects: "Difetti Reali",
    correct: "Corretto",
    incorrect: "Errato",
    missed: "Mancato",
    closeReview: "Chiudi Revisione",
    detectorType: "Tipo Rivelatore",
    detectorCR: "CR (Radiografia Computerizzata)",
    detectorDDA: "DDA (Digital Detector Array)",
    crDescription: "Piastra ai fosfori - Maggiore latitudine, più rumore",
    ddaDescription: "Flat panel - Risposta lineare, meno rumore",
    iqiType: "Tipo IQI",
    iqiNone: "Nessuno",
    iqiISO: "ISO 19232-1 (Fili)",
    iqiASTM: "ASTM E1025 (Fori)",
    iqiVisible: "Visibilità IQI",
    wireVisible: "Filo visibile",
    wiresVisibleCount: "Fili visibili",
    holeVisible: "Foro visibile",
    showIdealParams: "Mostra Parametri Ideali",
    idealParameters: "Parametri Ideali",
    idealParamsDescription: "Impostazioni di esposizione raccomandate per questo materiale/spessore",
    currentParams: "Attuali",
    idealParams: "Ideali",
    parameterMatch: "Corrispondenza Parametri",
    exposureQuality: "Qualità Esposizione",
    changelog: "Cronologia",
    changelogTitle: "Storico Versioni",
    version: "Versione",
    trainingTime: "Tempo Formazione",
    totalTrainingTime: "Tempo Totale Formazione",
    sessionTime: "Tempo Sessione",
    hours: "h",
    minutes: "m",
    seconds: "s",
    invertPolarity: "Inverti Polarità",
    polarityNormal: "Normale",
    polarityInverted: "Invertita",
    // Single Session
    singleSession: "Sessione Singola",
    singleSessionTitle: "Sessione Intensiva RT",
    singleSessionSubtitle: "2 ore di accesso completo",
    singleSessionPrice: "€9,90",
    singleSessionDuration: "2 ore",
    singleSessionBuy: "Inizia Ora",
    singleSessionActivate: "Attiva Sessione",
    singleSessionActive: "Sessione Attiva",
    singleSessionExpired: "Sessione Scaduta",
    singleSessionRemaining: "Tempo Rimanente",
    singleSessionFeatures: "Cosa include",
    singleSessionFeature1: "Tutte e 3 le modalità: Insegnamento, Apprendimento, Esame",
    singleSessionFeature2: "Tutti i tipi di difetti",
    singleSessionFeature3: "Tutti i materiali",
    singleSessionFeature4: "Certificato scaricabile",
    singleSessionNoSave: "Progressi non salvati",
    singleSessionActivateNow: "Iniziare le tue 2 ore adesso?",
    singleSessionActivateWarning: "Una volta attivata, il timer non può essere messo in pausa",
    singleSessionConfirmActivate: "Sì, Inizia Ora",
    singleSessionLater: "Più Tardi",
    singleSessionTimeWarning: "Hai ancora {minutes} minuti",
    singleSessionUpgradeOffer: "Vuoi più tempo? Ottieni il 20% di sconto su Standard!",
    singleSessionUpgrade: "Passa a Standard",
    singleSessionBuyAnother: "Acquista Altra Sessione",
    singleSessionExpiredMessage: "La tua sessione è terminata",
    singleSessionCode: "Codice di Accesso",
    singleSessionEnterCode: "Inserisci il tuo codice di accesso",
    singleSessionInvalidCode: "Codice non valido o scaduto",
    singleSessionOrLogin: "Oppure accedi con account",
    tryFree: "Prova Gratis",
    freeTrialInfo: "15 minuti di prova gratuita",
    subscriptionPlans: "Piani di Abbonamento",
    standardPlan: "Standard",
    professionalPlan: "Professional",
    enterprisePlan: "Enterprise",
    perMonth: "/mese",
    perYear: "/anno",
    popular: "Popolare",
    currentPlan: "Piano Attuale",
    // Learning Progress
    learningProgress: "Progresso",
    defectsFound: "Difetti trovati",
    correct: "Corretti",
    wrongType: "Tipo errato",
    falsePositives: "Falsi positivi",
    missed: "Mancanti",
    showCorrection: "Mostra Correzione",
    hideCorrection: "Nascondi Correzione",
    missedDefects: "Difetti mancanti",
    allDefectsFound: "Tutti i difetti trovati!",
    // Demo & Beta
    freeDemo: "Demo Gratuita",
    freeDemoDesc: "Prova il simulatore per 15 minuti",
    free: "GRATIS",
    betaAccess: "ACCESSO BETA",
    fullAccess: "Accesso completo al simulatore",
    betaFreeAccess: "Accesso Beta Gratuito",
    betaFreeAccessDesc: "Nessun pagamento richiesto durante il beta test",
    activating: "Attivazione...",
    getAccess: "Ottieni Accesso",
    back: "Indietro",
    accessGranted: "Accesso Attivato!",
    sessionReadyToActivate: "La tua sessione è pronta per essere attivata.",
    sevenDaysToStart: "Hai 7 giorni per iniziare.",
    enterEmail: "Inserisci la tua email",
    receiveCode: "Riceverai il codice di accesso",
    // Feedback
    feedbackCopied: "Feedback copiato negli appunti!",
    feedbackEmailTo: "Invia feedback a",
    feedbackProblemPlaceholder: "Descrivi il problema riscontrato, i passaggi per riprodurlo e il comportamento atteso...",
    feedbackFeaturePlaceholder: "Descrivi la funzionalità che vorresti vedere aggiunta...",
    selectedArea: "Area selezionata",
    detectedOf: "Trovati",
    thanksForUsing: "Grazie per aver usato RT Training!",
    chooseHowToContinue: "Scegli come continuare:",
    newSession: "Nuova Sessione",
    getAnotherTwoHours: "Ottieni altre 2 ore di accesso",
    tryFreeDemo: "Prova Demo Gratuita (15 min)",
    close: "Chiudi",
    // Time tracking
    totalTimeInApp: "Tempo Totale in App",
    sessionStarted: "Sessione iniziata",
    // Login screen
    alreadyHaveAccount: "Hai già un account? Accedi",
    needAccount: "Serve un account? Registrati",
    demoAccounts: "Account Demo",
    certificateSubscriptionOnly: "Certificato disponibile solo con abbonamento",
    // Demo & Single Session Restrictions
    examDisabledDemo: "Modalità Esame disponibile con sessione completa",
    moreMaterialsWithPro: "Altri materiali con sessione completa",
    moreIqiWithPro: "IQI avanzati con sessione completa",
    moreDefectsWithPro: "Altri tipi di difetti con sessione completa",
    examsUsed: "Esami",
    examLimitReached: "Limite esami raggiunto",
    examCompleted: "Esame Completato!",
    examsRemaining: "Esami rimanenti in questa sessione",
    noExamsRemaining: "Hai utilizzato tutti gli esami di questa sessione",
    withSubscription: "Con l'abbonamento ottieni",
    unlimitedExams: "Esami illimitati",
    savedProgress: "Progressi salvati permanentemente",
    downloadableCertificates: "Certificati scaricabili",
    detailedStats: "Statistiche dettagliate",
    continuePractice: "Continua",
    viewPlans: "Vedi Piani",
    subscriptionComingSoon: "Abbonamenti disponibili al termine del beta test!",
    // Terms of Service
    termsOfService: "Termini di Servizio",
    acceptTerms: "Accetto i Termini",
    decline: "Rifiuta"
  }
};

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleSession, setSingleSession] = useState(null);

  useEffect(() => {
    checkAuth();
    checkSingleSession();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await storage.get('current_user');
      if (result && result.value) {
        setUser(JSON.parse(result.value));
      }
    } catch (err) {
      console.log('No active session');
    }
    setLoading(false);
  };

  const checkSingleSession = async () => {
    try {
      const result = await storage.get('single_session');
      if (result && result.value) {
        const session = JSON.parse(result.value);
        // Check if session is still valid
        if (session.status === 'active' && session.expirationDate) {
          const now = new Date();
          const expiry = new Date(session.expirationDate);
          if (now < expiry) {
            setSingleSession(session);
          } else {
            // Session expired
            session.status = 'expired';
            await storage.set('single_session', JSON.stringify(session));
            setSingleSession(session);
          }
        } else if (session.status === 'purchased') {
          // Session purchased but not activated
          setSingleSession(session);
        }
      }
    } catch (err) {
      console.log('No single session');
    }
  };

  const login = async (email, password) => {
    try {
      const usersResult = await storage.get('users_db');
      const users = usersResult ? JSON.parse(usersResult.value) : [];
      
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const userSession = { ...foundUser, lastLogin: new Date().toISOString() };
        delete userSession.password;
        await storage.set('current_user', JSON.stringify(userSession));
        setUser(userSession);
        return { success: true };
      }
      return { success: false, error: 'Credenziali non valide' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await storage.delete('current_user');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const usersResult = await storage.get('users_db');
      const users = usersResult ? JSON.parse(usersResult.value) : [];
      
      if (users.find(u => u.email === userData.email)) {
        return { success: false, error: 'Email già esistente' };
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        exams: []
      };
      
      users.push(newUser);
      await storage.set('users_db', JSON.stringify(users));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Purchase single session (simulated - in production would use Stripe)
  const purchaseSingleSession = async (email) => {
    try {
      const sessionCode = 'SS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const newSession = {
        id: 'sess_' + Date.now(),
        code: sessionCode,
        email: email,
        purchaseDate: new Date().toISOString(),
        activationDate: null,
        expirationDate: null,
        status: 'purchased', // purchased | active | expired
        durationMinutes: 120, // 2 hours
        price: 9.90,
        currency: 'EUR'
      };
      
      await storage.set('single_session', JSON.stringify(newSession));
      setSingleSession(newSession);
      
      return { success: true, session: newSession };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Activate single session - starts the 2 hour timer
  const activateSingleSession = async () => {
    try {
      if (!singleSession || singleSession.status !== 'purchased') {
        return { success: false, error: 'No session to activate' };
      }
      
      const now = new Date();
      const expiry = new Date(now.getTime() + singleSession.durationMinutes * 60 * 1000);
      
      const activatedSession = {
        ...singleSession,
        activationDate: now.toISOString(),
        expirationDate: expiry.toISOString(),
        status: 'active'
      };
      
      await storage.set('single_session', JSON.stringify(activatedSession));
      setSingleSession(activatedSession);
      
      // Create temporary user for the session
      const tempUser = {
        id: 'single_' + Date.now(),
        email: singleSession.email,
        username: 'Sessione Singola',
        role: 'student',
        isSingleSession: true,
        sessionId: singleSession.id,
        exams: []
      };
      
      await storage.set('current_user', JSON.stringify(tempUser));
      setUser(tempUser);
      
      return { success: true, session: activatedSession };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Redeem a session code
  const redeemSessionCode = async (code) => {
    try {
      const result = await storage.get('single_session');
      if (result && result.value) {
        const session = JSON.parse(result.value);
        if (session.code === code && session.status === 'purchased') {
          setSingleSession(session);
          return { success: true, session };
        }
      }
      return { success: false, error: 'Invalid code' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Get remaining time in seconds
  const getSessionRemainingTime = () => {
    if (!singleSession || singleSession.status !== 'active' || !singleSession.expirationDate) {
      return null;
    }
    const now = new Date();
    const expiry = new Date(singleSession.expirationDate);
    const remaining = Math.max(0, Math.floor((expiry - now) / 1000));
    return remaining;
  };

  // Check if session is active
  const isSessionActive = () => {
    if (!singleSession) return false;
    if (singleSession.status !== 'active') return false;
    const remaining = getSessionRemainingTime();
    return remaining !== null && remaining > 0;
  };

  // Expire session
  const expireSingleSession = async () => {
    if (singleSession) {
      const expiredSession = { ...singleSession, status: 'expired' };
      await storage.set('single_session', JSON.stringify(expiredSession));
      setSingleSession(expiredSession);
    }
  };

  // Clear single session
  const clearSingleSession = async () => {
    await storage.delete('single_session');
    setSingleSession(null);
  };

  // Start free demo - 15 minutes, no registration needed
  const startFreeDemo = async () => {
    try {
      const now = new Date();
      const expiry = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes
      
      const demoSession = {
        id: 'demo_' + Date.now(),
        code: 'DEMO',
        email: 'demo@demo.com',
        purchaseDate: now.toISOString(),
        activationDate: now.toISOString(),
        expirationDate: expiry.toISOString(),
        status: 'active',
        durationMinutes: 15,
        price: 0,
        currency: 'EUR',
        isDemo: true
      };
      
      await storage.set('single_session', JSON.stringify(demoSession));
      setSingleSession(demoSession);
      
      // Create temporary demo user
      const demoUser = {
        id: 'demo_' + Date.now(),
        email: 'demo@demo.com',
        username: 'Demo User',
        role: 'student',
        isSingleSession: true,
        isDemo: true,
        sessionId: demoSession.id,
        exams: []
      };
      
      await storage.set('current_user', JSON.stringify(demoUser));
      setUser(demoUser);
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register,
      singleSession,
      purchaseSingleSession,
      activateSingleSession,
      redeemSessionCode,
      getSessionRemainingTime,
      isSessionActive,
      expireSingleSession,
      clearSingleSession,
      startFreeDemo
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
const useLanguage = () => useContext(LanguageContext);

// Single Session Timer Component - Visible during active session
const SingleSessionTimer = ({ onExpire, onWarning }) => {
  const { getSessionRemainingTime, isSessionActive, singleSession } = useAuth();
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(getSessionRemainingTime());
  const [warned30, setWarned30] = useState(false);
  const [warned15, setWarned15] = useState(false);
  const [warned5, setWarned5] = useState(false);

  useEffect(() => {
    if (!isSessionActive()) return;
    
    const interval = setInterval(() => {
      const time = getSessionRemainingTime();
      setRemaining(time);
      
      if (time <= 1800 && !warned30) { // 30 minutes
        setWarned30(true);
        onWarning?.(30);
      }
      
      if (time <= 900 && !warned15) { // 15 minutes
        setWarned15(true);
        onWarning?.(15);
      }
      
      if (time <= 300 && !warned5) { // 5 minutes
        setWarned5(true);
        onWarning?.(5);
      }
      
      if (time <= 0) {
        onExpire?.();
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [singleSession]);

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isSessionActive() || remaining === null) return null;

  const isLow = remaining < 900; // Less than 15 minutes
  const isCritical = remaining < 300; // Less than 5 minutes

  return (
    <div className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-2 shadow-lg border ${
      isCritical ? 'bg-red-900/90 border-red-500 animate-pulse' :
      isLow ? 'bg-yellow-900/90 border-yellow-500' :
      'bg-gray-900/90 border-gray-600'
    }`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Timer className={`w-5 h-5 ${isCritical ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-cyan-400'}`} />
          <span className="text-xs text-gray-400">{t.singleSessionRemaining}:</span>
        </div>
        <span className={`font-mono text-lg font-bold ${
          isCritical ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-white'
        }`}>
          {formatTime(remaining)}
        </span>
        <Zap className="w-4 h-4 text-yellow-400" />
      </div>
    </div>
  );
};

// Single Session Purchase Modal
const SingleSessionPurchaseModal = ({ onClose, onPurchase }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('info'); // info | email | success
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!email) return;
    setLoading(true);
    
    // Beta: instant access, no payment
    setTimeout(async () => {
      const result = await onPurchase(email);
      setLoading(false);
      if (result.success) {
        setStep('success');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-600 max-w-md w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t.singleSessionTitle}</h2>
                <p className="text-yellow-100 text-sm">{t.singleSessionSubtitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'info' && (
            <>
              {/* Beta Badge - No Price */}
              <div className="text-center mb-6">
                <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-3">
                  <span className="text-yellow-400 font-bold text-sm">{t.betaAccess || 'ACCESSO BETA'}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{t.singleSessionDuration}</div>
                <div className="text-gray-400 text-sm">{t.fullAccess || 'Accesso completo al simulatore'}</div>
              </div>

              {/* Features */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">{t.singleSessionFeatures}:</h3>
                <ul className="space-y-2">
                  {[t.singleSessionFeature1, t.singleSessionFeature2, t.singleSessionFeature3, t.singleSessionFeature4].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note */}
              <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {t.singleSessionActivateWarning}
                </p>
              </div>

              <button
                onClick={() => setStep('email')}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {t.singleSessionBuy}
              </button>
            </>
          )}

          {step === 'email' && (
            <>
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">{t.enterEmail || 'Inserisci la tua email'}</h3>
                <p className="text-sm text-gray-400">{t.receiveCode || 'Riceverai il codice di accesso'}</p>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@esempio.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 mb-4"
              />

              {/* Beta - No payment needed */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-4 text-center">
                <p className="text-yellow-400 text-sm font-semibold">{t.betaFreeAccess || 'Accesso Beta Gratuito'}</p>
                <p className="text-gray-400 text-xs mt-1">{t.betaFreeAccessDesc || 'Nessun pagamento richiesto durante il beta test'}</p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={!email || loading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {t.activating || 'Attivazione...'}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    {t.getAccess || 'Ottieni Accesso'}
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('info')}
                className="w-full mt-3 text-gray-400 hover:text-white text-sm"
              >
                ← {t.back || 'Indietro'}
              </button>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.accessGranted || 'Accesso Attivato!'}</h3>
              <p className="text-gray-400 mb-6">
                {t.sessionReadyToActivate || 'La tua sessione è pronta per essere attivata.'}<br />
                {t.sevenDaysToStart || 'Hai 7 giorni per iniziare.'}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {t.singleSessionActivate}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Single Session Activate Modal
const SingleSessionActivateModal = ({ session, onActivate, onClose }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    setLoading(true);
    await onActivate();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-600 max-w-sm w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t.singleSessionActivateNow}</h3>
          <p className="text-gray-400 text-sm mb-6">{t.singleSessionActivateWarning}</p>
          
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <Clock className="w-8 h-8 text-cyan-400" />
              <div className="text-left">
                <div className="text-3xl font-bold text-white">2:00:00</div>
                <div className="text-sm text-gray-400">ore disponibili</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
            >
              {t.singleSessionLater}
            </button>
            <button
              onClick={handleActivate}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {t.singleSessionConfirmActivate}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Session Expired/Upsell Modal
const SingleSessionExpiredModal = ({ onBuyAnother, onUpgrade, onClose, onStartDemo }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-600 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4 text-center">
          <Timer className="w-12 h-12 text-white mx-auto mb-2" />
          <h2 className="text-xl font-bold text-white">{t.singleSessionExpiredMessage}</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-300 text-center mb-6">
            {t.thanksForUsing || 'Grazie per aver usato RT Training!'}<br/>
            {t.chooseHowToContinue || 'Scegli come continuare:'}
          </p>

          {/* Beta - Free sessions */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-800/50 border border-yellow-600 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm">{t.betaAccess || 'ACCESSO BETA'}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">{t.newSession || 'Nuova Sessione'}</h3>
            <p className="text-sm text-gray-400 mb-3">{t.getAnotherTwoHours || 'Ottieni altre 2 ore di accesso'}</p>
            <button
              onClick={onBuyAnother}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              {t.singleSessionBuyAnother}
            </button>
          </div>

          {/* Free Demo - 15 min */}
          <button
            onClick={onStartDemo}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-3"
          >
            <Play className="w-5 h-5" />
            {t.tryFreeDemo || 'Prova Demo Gratuita (15 min)'}
          </button>

          {/* Logout */}
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm py-2 rounded-lg"
          >
            {t.logout || 'Esci'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Single Session Upsell Modal (shown at 15 minutes)
const SingleSessionUpsellModal = ({ remainingMinutes, onUpgrade, onDismiss }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-yellow-500 max-w-sm w-full p-6 shadow-lg shadow-yellow-500/20">
        <div className="text-center">
          <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Clock className="w-7 h-7 text-yellow-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {t.singleSessionTimeWarning.replace('{minutes}', remainingMinutes)}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{t.singleSessionUpgradeOffer}</p>
          
          <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">-20% su Standard</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onDismiss}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition text-sm"
            >
              Continua
            </button>
            <button
              onClick={onUpgrade}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition text-sm"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subscription Promo Modal (shown after exam in single session)
const SubscriptionPromoModal = ({ examCount, maxExams, onDismiss }) => {
  const { t } = useLanguage();
  const remainingExams = maxExams - examCount;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-cyan-500/50 max-w-md w-full p-6 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {t.examCompleted || 'Esame Completato!'}
          </h3>
          
          <p className="text-gray-400 mb-4">
            {remainingExams > 0 ? (
              <>
                {t.examsRemaining || 'Esami rimanenti in questa sessione'}: <span className="text-cyan-400 font-bold">{remainingExams}</span>
              </>
            ) : (
              <span className="text-yellow-400">{t.noExamsRemaining || 'Hai utilizzato tutti gli esami di questa sessione'}</span>
            )}
          </p>
          
          <div className="bg-cyan-900/30 border border-cyan-600/50 rounded-lg p-4 mb-4">
            <h4 className="text-cyan-400 font-semibold mb-2">{t.withSubscription || 'Con l\'abbonamento ottieni'}:</h4>
            <ul className="text-sm text-gray-300 space-y-1 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {t.unlimitedExams || 'Esami illimitati'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {t.savedProgress || 'Progressi salvati permanentemente'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {t.downloadableCertificates || 'Certificati scaricabili'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {t.detailedStats || 'Statistiche dettagliate'}
              </li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onDismiss}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
            >
              {t.continuePractice || 'Continua'}
            </button>
            <button
              onClick={() => {
                alert(t.subscriptionComingSoon || 'Abbonamenti disponibili al termine del beta test!');
                onDismiss();
              }}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4" />
              {t.viewPlans || 'Vedi Piani'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const [showSingleSessionModal, setShowSingleSessionModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const { login, register, singleSession, purchaseSingleSession, activateSingleSession, startFreeDemo } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register({ email, password, username, role });
    if (result.success) {
      setIsRegistering(false);
      setError('Registrazione completata! Ora puoi accedere.');
    } else {
      setError(result.error);
    }
  };

  const handlePurchaseSingleSession = async (email) => {
    const result = await purchaseSingleSession(email);
    if (result.success) {
      setShowSingleSessionModal(false);
      setShowActivateModal(true);
    }
    return result;
  };

  const handleActivateSingleSession = async () => {
    await activateSingleSession();
    setShowActivateModal(false);
  };

  // Start free demo - 15 minutes
  const handleStartFreeDemo = async () => {
    await startFreeDemo();
  };

  // Check if there's a purchased session waiting to be activated
  useEffect(() => {
    if (singleSession && singleSession.status === 'purchased') {
      setShowActivateModal(true);
    }
  }, [singleSession]);

  useEffect(() => {
    const initDemoUsers = async () => {
      try {
        // Version check - increment to force re-initialization with new demo data
        const DB_VERSION = 'v5_beta_app_time';
        const versionResult = await storage.get('db_version');
        const currentVersion = versionResult?.value;
        
        if (currentVersion !== DB_VERSION) {
          // Demo exams for testing
          const demoExams1 = [
            { id: 'e1', date: '2026-01-05', material: 'aluminum', thickness: 10, score: 85, detected: 3, total: 4, falsePositives: 1, trainingTimeSeconds: 2850, trainingTimeFormatted: '0h 47m 30s' },
            { id: 'e2', date: '2026-01-07', material: 'titanium', thickness: 15, score: 72, detected: 2, total: 3, falsePositives: 0, trainingTimeSeconds: 3600, trainingTimeFormatted: '1h 00m 00s' },
            { id: 'e3', date: '2026-01-09', material: 'aluminum', thickness: 8, score: 90, detected: 4, total: 4, falsePositives: 0, trainingTimeSeconds: 5400, trainingTimeFormatted: '1h 30m 00s' }
          ];
          const demoExams2 = [
            { id: 'e4', date: '2026-01-06', material: 'inconel', thickness: 20, score: 65, detected: 2, total: 4, falsePositives: 1, trainingTimeSeconds: 1800, trainingTimeFormatted: '0h 30m 00s' },
            { id: 'e5', date: '2026-01-08', material: 'aluminum', thickness: 12, score: 78, detected: 3, total: 4, falsePositives: 0, trainingTimeSeconds: 4200, trainingTimeFormatted: '1h 10m 00s' }
          ];
          const demoExams3 = [
            { id: 'e6', date: '2026-01-04', material: 'titanium', thickness: 10, score: 55, detected: 2, total: 5, falsePositives: 2, trainingTimeSeconds: 900, trainingTimeFormatted: '0h 15m 00s' },
            { id: 'e7', date: '2026-01-06', material: 'aluminum', thickness: 15, score: 68, detected: 3, total: 5, falsePositives: 1, trainingTimeSeconds: 2400, trainingTimeFormatted: '0h 40m 00s' },
            { id: 'e8', date: '2026-01-08', material: 'inconel', thickness: 25, score: 75, detected: 3, total: 4, falsePositives: 0, trainingTimeSeconds: 3300, trainingTimeFormatted: '0h 55m 00s' },
            { id: 'e9', date: '2026-01-10', material: 'aluminum', thickness: 10, score: 82, detected: 4, total: 5, falsePositives: 0, trainingTimeSeconds: 4800, trainingTimeFormatted: '1h 20m 00s' }
          ];
          
          const demoUsers = [
            { id: '1', email: 'admin@rt.com', password: 'admin123', username: 'Admin', role: 'admin', createdAt: '2026-01-01T00:00:00.000Z', exams: [], totalAppTimeSeconds: 0 },
            { id: '2', email: 'trainer@rt.com', password: 'trainer123', username: 'Dr. Rossi', role: 'trainer', createdAt: '2026-01-01T00:00:00.000Z', exams: [], totalAppTimeSeconds: 0 },
            { id: '3', email: 'marco.bianchi@demo.com', password: 'demo123', username: 'Marco Bianchi', role: 'student', createdAt: '2026-01-03T00:00:00.000Z', exams: demoExams1, totalAppTimeSeconds: 7200 },
            { id: '4', email: 'laura.verdi@demo.com', password: 'demo123', username: 'Laura Verdi', role: 'student', createdAt: '2026-01-04T00:00:00.000Z', exams: demoExams2, totalAppTimeSeconds: 3600 },
            { id: '5', email: 'giuseppe.neri@demo.com', password: 'demo123', username: 'Giuseppe Neri', role: 'student', createdAt: '2026-01-02T00:00:00.000Z', exams: demoExams3, totalAppTimeSeconds: 10800 }
          ];
          await storage.set('users_db', JSON.stringify(demoUsers));
          await storage.set('db_version', DB_VERSION);
          console.log('Database initialized with demo users (version: ' + DB_VERSION + ')');
        }
      } catch (err) {
        console.error('Init error:', err);
      }
    };
    initDemoUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      {/* Single Session Modals */}
      {showSingleSessionModal && (
        <SingleSessionPurchaseModal 
          onClose={() => setShowSingleSessionModal(false)}
          onPurchase={handlePurchaseSingleSession}
        />
      )}
      {showActivateModal && singleSession && (
        <SingleSessionActivateModal 
          session={singleSession}
          onActivate={handleActivateSingleSession}
          onClose={() => setShowActivateModal(false)}
        />
      )}

      <div className="absolute top-4 right-4">
        <button onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700">
          <Globe className="w-4 h-4" />
          {language.toUpperCase()}
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <img src={COMPANY_LOGO} alt="Company Logo" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400 text-sm">{t.subtitle}</p>
        </div>

        {/* Demo and Single Session Options */}
        <div className="space-y-3 mb-6">
          {/* Free Demo Banner */}
          <div 
            onClick={() => handleStartFreeDemo()}
            className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/50 rounded-lg p-3 cursor-pointer hover:border-green-400 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 rounded-full p-2 group-hover:bg-green-500/30 transition">
                  <Play className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{t.freeDemo || 'Demo Gratuita'}</h3>
                  <p className="text-gray-400 text-xs">{t.freeDemoDesc || 'Prova il simulatore per 15 minuti'}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-sm">{t.free || 'GRATIS'}</div>
                <div className="text-xs text-gray-500">15 min</div>
              </div>
            </div>
          </div>

          {/* Single Session Banner - Beta: no price shown */}
          <div 
            onClick={() => setShowSingleSessionModal(true)}
            className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-lg p-3 cursor-pointer hover:border-yellow-400 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/20 rounded-full p-2 group-hover:bg-yellow-500/30 transition">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{t.singleSession}</h3>
                  <p className="text-gray-400 text-xs">{t.singleSessionSubtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-xs">{t.betaAccess || 'ACCESSO BETA'}</div>
                <div className="text-xs text-gray-500">{t.singleSessionDuration}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-xs text-gray-500">{t.singleSessionOrLogin}</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.username}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.role}</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                  <option value="student">{t.student}</option>
                  <option value="trainer">{t.trainer}</option>
                  <option value="admin">{t.admin}</option>
                </select>
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.password}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            {isRegistering ? 'Registrati' : t.login}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-400 hover:text-blue-300 text-sm">
            {isRegistering ? t.alreadyHaveAccount : t.needAccount}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center mb-2">{t.demoAccounts}:</p>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Trainer: trainer@rt.com / trainer123</p>
            <p>Studente 1: marco.bianchi@demo.com / demo123</p>
            <p>Studente 2: laura.verdi@demo.com / demo123</p>
            <p>Studente 3: giuseppe.neri@demo.com / demo123</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">{COPYRIGHT_TEXT}</p>
          <button 
            onClick={() => setShowTosModal(true)}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline block mx-auto mt-2"
          >
            {t.termsOfService || 'Termini di Servizio'}
          </button>
          <div className="mt-3 p-2 bg-yellow-900/30 border border-yellow-700/50 rounded text-center">
            <p className="text-xs text-yellow-400 font-semibold">{t.certificateDisclaimer1}</p>
            <p className="text-xs text-yellow-600">{t.certificateDisclaimer2}</p>
          </div>
        </div>
      </div>
      
      {/* Terms of Service Modal */}
      {showTosModal && (
        <TermsOfServiceModal onClose={() => setShowTosModal(false)} />
      )}
    </div>
  );
};

// Certificates View Component
const CertificatesView = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [generating, setGenerating] = useState(null);
  
  // Get passed exams (score >= 80%)
  const passedExams = (user?.exams || []).filter(exam => parseFloat(exam.score) >= 80);
  
  const generateCertificatePDF = async (exam) => {
    setGenerating(exam.id);
    
    try {
      // Dynamically load jsPDF
      const jsPDF = (await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')).jsPDF || window.jspdf.jsPDF;
      
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Background gradient effect (simulated with rectangles)
      doc.setFillColor(15, 23, 42); // Dark blue-gray
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Decorative border
      doc.setDrawColor(234, 179, 8); // Gold
      doc.setLineWidth(2);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');
      
      // Inner border
      doc.setDrawColor(234, 179, 8, 0.5);
      doc.setLineWidth(0.5);
      doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S');
      
      // Corner decorations
      const cornerSize = 15;
      doc.setFillColor(234, 179, 8);
      // Top-left
      doc.triangle(10, 10, 10 + cornerSize, 10, 10, 10 + cornerSize, 'F');
      // Top-right
      doc.triangle(pageWidth - 10, 10, pageWidth - 10 - cornerSize, 10, pageWidth - 10, 10 + cornerSize, 'F');
      // Bottom-left
      doc.triangle(10, pageHeight - 10, 10 + cornerSize, pageHeight - 10, 10, pageHeight - 10 - cornerSize, 'F');
      // Bottom-right
      doc.triangle(pageWidth - 10, pageHeight - 10, pageWidth - 10 - cornerSize, pageHeight - 10, pageWidth - 10, pageHeight - 10 - cornerSize, 'F');
      
      // Title
      doc.setTextColor(234, 179, 8); // Gold
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      doc.text(t.certificateTitle, pageWidth / 2, 45, { align: 'center' });
      
      // Decorative line under title
      doc.setDrawColor(234, 179, 8);
      doc.setLineWidth(1);
      doc.line(pageWidth / 2 - 60, 52, pageWidth / 2 + 60, 52);
      
      // "This is to certify that"
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(t.certificateBody, pageWidth / 2, 70, { align: 'center' });
      
      // Student name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text(user.username, pageWidth / 2, 88, { align: 'center' });
      
      // Decorative line under name
      doc.setDrawColor(100, 100, 100);
      doc.setLineWidth(0.5);
      doc.line(pageWidth / 2 - 50, 94, pageWidth / 2 + 50, 94);
      
      // "has successfully completed"
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(t.certificateCompletion, pageWidth / 2, 108, { align: 'center' });
      
      // Training name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(t.certificateTraining, pageWidth / 2, 122, { align: 'center' });
      
      // Exam details box
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(pageWidth / 2 - 70, 132, 140, 30, 3, 3, 'F');
      
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      const materialNames = { aluminum: 'Alluminio', titanium: 'Titanio', inconel: 'Inconel' };
      const materialName = materialNames[exam.material] || exam.material;
      
      doc.text(`${t.certificateMaterial}: ${materialName}`, pageWidth / 2 - 60, 145);
      doc.text(`${t.certificateThickness}: ${exam.thickness} mm`, pageWidth / 2 - 60, 153);
      doc.text(`${t.certificateScore}: ${exam.score}%`, pageWidth / 2 + 20, 145);
      doc.text(`${t.certificateDate}: ${exam.date}`, pageWidth / 2 + 20, 153);
      
      // Award icon (simulated with circles)
      doc.setFillColor(234, 179, 8);
      doc.circle(pageWidth / 2, 178, 8, 'F');
      doc.setFillColor(15, 23, 42);
      doc.circle(pageWidth / 2, 178, 5, 'F');
      doc.setFillColor(234, 179, 8);
      doc.circle(pageWidth / 2, 178, 3, 'F');
      
      // Disclaimer (two lines)
      doc.setTextColor(255, 200, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(t.certificateDisclaimer1, pageWidth / 2, pageHeight - 22, { align: 'center' });
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text(t.certificateDisclaimer2, pageWidth / 2, pageHeight - 16, { align: 'center' });
      
      // Footer with app info
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(7);
      doc.text('RT Training NAS 410 - Industrial Radiography Simulator', pageWidth / 2, pageHeight - 12, { align: 'center' });
      
      // Download the PDF
      doc.save(`Certificato_${user.username.replace(/\s+/g, '_')}_${exam.date}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback: generate simple PDF without jsPDF dynamic import
      generateSimpleCertificate(exam);
    }
    
    setGenerating(null);
  };
  
  // Fallback simple certificate generator using data URL
  const generateSimpleCertificate = (exam) => {
    const materialNames = { aluminum: 'Alluminio', titanium: 'Titanio', inconel: 'Inconel' };
    const materialName = materialNames[exam.material] || exam.material;
    
    // Create a simple HTML certificate and print to PDF
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @page { size: A4 landscape; margin: 0; }
          body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            margin: 0;
            padding: 40px;
            min-height: 100vh;
            box-sizing: border-box;
          }
          .certificate {
            border: 3px solid #eab308;
            padding: 40px;
            text-align: center;
            height: calc(100vh - 80px);
            box-sizing: border-box;
            position: relative;
          }
          .title { color: #eab308; font-size: 36px; font-weight: bold; margin-bottom: 20px; }
          .subtitle { color: #ccc; font-size: 16px; margin: 15px 0; }
          .name { font-size: 32px; font-weight: bold; margin: 20px 0; border-bottom: 2px solid #666; display: inline-block; padding: 0 30px 10px; }
          .training { font-size: 22px; font-weight: bold; margin: 20px 0; }
          .details { background: #1e293b; padding: 15px; border-radius: 8px; display: inline-block; margin: 20px 0; }
          .disclaimer { position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; }
          .disclaimer-line1 { color: #fbbf24; font-size: 12px; font-weight: bold; }
          .disclaimer-line2 { color: #888; font-size: 10px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="title">${t.certificateTitle}</div>
          <div class="subtitle">${t.certificateBody}</div>
          <div class="name">${user.username}</div>
          <div class="subtitle">${t.certificateCompletion}</div>
          <div class="training">${t.certificateTraining}</div>
          <div class="details">
            ${t.certificateMaterial}: ${materialName} | 
            ${t.certificateThickness}: ${exam.thickness}mm | 
            ${t.certificateScore}: ${exam.score}% | 
            ${t.certificateDate}: ${exam.date}
          </div>
          <div class="disclaimer">
            <div class="disclaimer-line1">${t.certificateDisclaimer1}</div>
            <div class="disclaimer-line2">${t.certificateDisclaimer2}</div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
    printWindow.print();
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">{t.certificates}</h2>
      </div>
      
      {passedExams.length === 0 ? (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">{t.certificateNone}</h3>
          <p className="text-gray-500 mb-6">{t.certificateEarn}</p>
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Score minimo richiesto: 80%</span>
          </div>
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg inline-block">
            <p className="text-xs text-yellow-400 font-semibold">{t.certificateDisclaimer1}</p>
            <p className="text-xs text-yellow-600">{t.certificateDisclaimer2}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-yellow-200 font-semibold">{t.certificateEarned}: {passedExams.length}</p>
                  <p className="text-yellow-300/70 text-sm">Clicca su un certificato per scaricarlo in PDF</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-yellow-400 font-semibold">{t.certificateDisclaimer1}</p>
                <p className="text-xs text-yellow-600">{t.certificateDisclaimer2}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {passedExams.map((exam, idx) => {
              const materialNames = { aluminum: 'Alluminio', titanium: 'Titanio', inconel: 'Inconel' };
              const materialName = materialNames[exam.material] || exam.material;
              
              return (
                <div 
                  key={exam.id || idx}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-yellow-600 transition-all group"
                >
                  {/* Certificate Preview Header */}
                  <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 p-4 border-b border-yellow-700/30">
                    <div className="flex items-center justify-between">
                      <Award className="w-8 h-8 text-yellow-400" />
                      <span className="text-2xl font-bold text-green-400">{exam.score}%</span>
                    </div>
                  </div>
                  
                  {/* Certificate Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{t.certificateTraining}</p>
                      <p className="text-white font-medium">Radiografia Industriale</p>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">{t.certificateMaterial}</p>
                        <p className="text-white">{materialName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">{t.certificateThickness}</p>
                        <p className="text-white">{exam.thickness} mm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <span className="text-gray-400 text-sm">{exam.date}</span>
                      <button
                        onClick={() => generateSimpleCertificate(exam)}
                        disabled={generating === exam.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded text-sm font-medium transition"
                      >
                        {generating === exam.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        {t.certificateDownload}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// Trainer Dashboard - Students Overview
const TrainerDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [stats, setStats] = useState({ totalStudents: 0, totalExams: 0, avgScore: 0, totalAppTime: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    loadStudents();
    // Refresh every 30 seconds to update time
    const interval = setInterval(loadStudents, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStudents = async () => {
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const usersData = JSON.parse(usersResult.value);
        const studentsList = usersData.filter(u => u.role === 'student');
        setStudents(studentsList);
        
        const totalExams = studentsList.reduce((sum, u) => sum + (u.exams?.length || 0), 0);
        const allScores = studentsList.flatMap(u => u.exams?.map(e => parseFloat(e.score)) || []);
        const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        // Use totalAppTimeSeconds for total time in app
        const totalAppTime = studentsList.reduce((sum, u) => sum + (u.totalAppTimeSeconds || 0), 0);
        
        setStats({
          totalStudents: studentsList.length,
          totalExams,
          avgScore: avgScore.toFixed(1),
          totalAppTime
        });
      }
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  const calculateTrend = (exams) => {
    if (!exams || exams.length < 2) return 'stable';
    const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
    const recent = sorted.slice(-3);
    if (recent.length < 2) return 'stable';
    
    const firstHalf = recent.slice(0, Math.ceil(recent.length / 2));
    const secondHalf = recent.slice(Math.ceil(recent.length / 2));
    
    const avgFirst = firstHalf.reduce((sum, e) => sum + parseFloat(e.score), 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((sum, e) => sum + parseFloat(e.score), 0) / secondHalf.length;
    
    if (avgSecond - avgFirst > 5) return 'improving';
    if (avgFirst - avgSecond > 5) return 'declining';
    return 'stable';
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-400 transform rotate-180" />;
      default: return <div className="w-4 h-4 flex items-center justify-center text-yellow-400">―</div>;
    }
  };

  const formatTotalTime = (seconds) => {
    if (!seconds) return '-';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const getStudentTotalTrainingTime = (student) => {
    // Use totalAppTimeSeconds for total time in app
    return student.totalAppTimeSeconds || 0;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header fisso */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-bold text-white">{t.studentsOverview}</h2>
      </div>

      {/* Contenuto scrollabile */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stats Cards - più compatte */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg border border-blue-700">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400 opacity-70" />
              <div>
                <p className="text-blue-300 text-xs">{t.students}</p>
                <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-green-800 p-4 rounded-lg border border-green-700">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-green-400 opacity-70" />
              <div>
                <p className="text-green-300 text-xs">{t.totalExams}</p>
                <p className="text-2xl font-bold text-white">{stats.totalExams}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-4 rounded-lg border border-purple-700">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-400 opacity-70" />
              <div>
                <p className="text-purple-300 text-xs">{t.avgScore}</p>
                <p className="text-2xl font-bold text-white">{stats.avgScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900 to-cyan-800 p-4 rounded-lg border border-cyan-700">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-cyan-400 opacity-70" />
              <div>
                <p className="text-cyan-300 text-xs">{t.totalTimeInApp || t.totalTrainingTime}</p>
                <p className="text-2xl font-bold text-white">{formatTotalTime(stats.totalAppTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table - più compatta */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-3 border-b border-gray-700 bg-gray-850">
            <h3 className="text-sm font-semibold text-white">{t.studentProgress}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">{t.username}</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">{t.exams}</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">{t.avgScore}</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.trainingTime}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">{t.trend}</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {students.map(student => {
                  const exams = student.exams || [];
                  const scores = exams.map(e => parseFloat(e.score));
                  const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '-';
                  const trend = calculateTrend(exams);
                  const totalTime = getStudentTotalTrainingTime(student);
                  
                  return (
                    <React.Fragment key={student.id}>
                      <tr className="hover:bg-gray-750 cursor-pointer" onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}>
                        <td className="px-3 py-2">
                          <div>
                            <p className="text-white font-medium">{student.username}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center text-gray-300">{exams.length}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-semibold ${
                            avg === '-' ? 'text-gray-500' :
                            parseFloat(avg) >= 80 ? 'text-green-400' :
                            parseFloat(avg) >= 60 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {avg}{avg !== '-' && '%'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-cyan-400 font-medium">
                            {formatTotalTime(totalTime)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex items-center justify-center">
                            {getTrendIcon(trend)}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="text-blue-400 text-xs">
                            {selectedStudent?.id === student.id ? '▲ Chiudi' : '▼ Dettagli'}
                          </span>
                        </td>
                      </tr>
                      
                      {/* Dettaglio studente inline */}
                      {selectedStudent?.id === student.id && (
                        <tr>
                          <td colSpan="6" className="bg-gray-900 p-4">
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              {t.examHistory}
                            </h4>
                            {exams.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                {[...exams]
                                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                                  .map((exam, idx) => (
                                  <div key={idx} className="bg-gray-800 rounded p-2 text-xs">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-gray-400">{exam.date}</span>
                                      <span className={`font-bold ${
                                        parseFloat(exam.score) >= 80 ? 'text-green-400' : 
                                        parseFloat(exam.score) >= 60 ? 'text-yellow-400' : 'text-red-400'
                                      }`}>
                                        {exam.score}%
                                      </span>
                                    </div>
                                    <p className="text-gray-500">{exam.material} • {exam.thickness}mm</p>
                                    <p className="text-gray-500">{t.detectedOf}: {exam.detected}/{exam.total}</p>
                                    {exam.trainingTimeFormatted && (
                                      <p className="text-cyan-400 flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3" />
                                        {exam.trainingTimeFormatted}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic text-sm">{t.noExams}</p>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalExams: 0, avgScore: 0, activeUsers: 0 });
  const [notification, setNotification] = useState(null);
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const usersData = JSON.parse(usersResult.value);
        setUsers(usersData);
        
        const totalExams = usersData.reduce((sum, u) => sum + (u.exams?.length || 0), 0);
        const allScores = usersData.flatMap(u => u.exams?.map(e => parseFloat(e.score)) || []);
        const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        
        setStats({
          totalUsers: usersData.length,
          totalExams,
          avgScore: avgScore.toFixed(1),
          activeUsers: usersData.filter(u => u.exams?.length > 0).length
        });
      }
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const exportDatabase = async () => {
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const data = {
          version: '1.0',
          exportDate: new Date().toISOString(),
          users: JSON.parse(usersResult.value)
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rt-training-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification(t.dataExported);
      }
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const importDatabase = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.users && Array.isArray(data.users)) {
          await storage.set('users_db', JSON.stringify(data.users));
          loadData();
          showNotification(t.dataImported);
        }
      } catch (err) {
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const clearDatabase = async () => {
    if (window.confirm(t.confirmClear)) {
      try {
        await storage.delete('users_db');
        setUsers([]);
        setStats({ totalUsers: 0, totalExams: 0, avgScore: 0, activeUsers: 0 });
        showNotification(t.dataCleared, 'warning');
      } catch (err) {
        console.error('Clear error:', err);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-yellow-600'
        }`}>
          <CheckCircle className="w-5 h-5" />
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">{t.admin} {t.dashboard}</h2>
        
        {/* Database Management */}
        <div className="flex gap-2">
          <button
            onClick={exportDatabase}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            <Download className="w-4 h-4" />
            {t.exportDatabase}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
          >
            <FileText className="w-4 h-4" />
            {t.importDatabase}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={importDatabase}
            className="hidden"
          />
          <button
            onClick={clearDatabase}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
          >
            <Trash2 className="w-4 h-4" />
            {t.clearDatabase}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">{t.users}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">{t.totalExams}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalExams}</p>
            </div>
            <ClipboardCheck className="w-12 h-12 text-green-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">{t.avgScore}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.avgScore}%</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-lg border border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm">{t.activeUsers}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.activeUsers}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Statistiche {t.users}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.username}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.email}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.role}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.exams}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.avgScore}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map(user => {
                const userScores = user.exams?.map(e => parseFloat(e.score)) || [];
                const userAvg = userScores.length > 0 ? (userScores.reduce((a, b) => a + b, 0) / userScores.length).toFixed(1) : '-';
                
                return (
                  <tr key={user.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3 text-sm text-white">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-red-900 text-red-200' :
                        user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.exams?.length || 0}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{userAvg}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Defect Type Selector Modal
const DefectTypeModal = ({ selectionArea, onConfirm, onCancel, t, isDemo }) => {
  const [selectedType, setSelectedType] = useState('crack');
  
  // In demo mode, only 3 defect types available
  const availableTypes = isDemo 
    ? ['crack', 'porosity', 'inclusion'] 
    : ['crack', 'porosity', 'cluster', 'inclusion', 'cavity'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">{t.selectDefectType}</h3>
        
        {selectionArea && (
          <div className="mb-4 p-3 bg-gray-700 rounded text-sm text-gray-300">
            <p>{t.selectedArea}: {Math.round(selectionArea.width)}×{Math.round(selectionArea.height)} px</p>
          </div>
        )}
        
        <div className="space-y-3 mb-6">
          {availableTypes.map(type => (
            <label key={type} className="flex items-center gap-3 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition">
              <input
                type="radio"
                name="defectType"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-5 h-5"
              />
              <span className="text-white font-medium">{t[type]}</span>
            </label>
          ))}
          {isDemo && (
            <div className="text-xs text-yellow-500 text-center mt-2">
              {t.moreDefectsWithPro || 'Altri tipi di difetti con sessione completa'}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(selectedType)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {t.confirm}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

// Changelog Modal Component
const ChangelogModal = ({ onClose, t }) => {
  const [expandedVersion, setExpandedVersion] = useState('1.0.0-beta');
  
  const changelog = [
    {
      version: '1.0.0-beta',
      date: '2026-01-14',
      title: 'Release Beta Iniziale',
      changes: [
        {
          category: 'Nuove Funzionalità',
          items: [
            'Tre modalità operative: Insegnamento, Apprendimento, Esame',
            'Modalità Insegnamento con parametri ottimali automatici e difetti evidenziati',
            'Modalità Apprendimento con feedback immediato (verde/rosso)',
            'Modalità Esame senza assistenza con valutazione finale',
            'Sessione Singola: 2 ore di accesso completo (Beta gratuito)',
            'Timer sessione singola con avvisi e offerta upgrade',
            'Contatore tempo di formazione per modalità Insegnamento e Apprendimento',
            'Tempo formazione registrato e passato al trainer con risultati esame',
            'Inversione polarità immagine (positivo/negativo)',
            'Storico versioni con cronologia migliorie'
          ]
        },
        {
          category: 'Tipi di Difetti',
          items: [
            'Cricche (crack) - lineari con ramificazioni',
            'Porosità (porosity) - singole, forma irregolare',
            'Cluster - gruppi di micro-porosità',
            'Inclusioni (inclusion) - più chiare, forma ellittica',
            'Cavità (cavity) - vuoti interni, forma irregolare allungata'
          ]
        },
        {
          category: 'IQI Supportati',
          items: [
            'ISO 19232-1 Wire Type (fili W1-W19)',
            'ASTM E1025 Hole Type (fori 1T, 2T, 4T)',
            'ISO 19232-5 Duplex per misura SRb (D1-D13)',
            'Visualizzazione combinata in modalità Insegnamento'
          ]
        },
        {
          category: 'Controlli Immagine',
          items: [
            'Zoom con rotella del mouse (50%-300%)',
            'Luminosità/Contrasto con tasto destro + trascinamento',
            'Inversione polarità immagine (positivo/negativo)',
            'Calibrazione DDA (offset, gain, bad pixel)',
            'Supporto rilevatori CR e DDA'
          ]
        },
        {
          category: 'Sistema Utenti',
          items: [
            'Ruoli: Admin, Trainer, Studente',
            'Sessione Singola: accesso temporaneo senza registrazione',
            'Dashboard Trainer con panoramica studenti e tempo formazione',
            'Dashboard Studente con storico esami',
            'Revisione esami con mappa visuale errori',
            'Certificati PDF scaricabili'
          ]
        },
        {
          category: 'Bug Fix',
          items: [
            'Risolto: storico esami non aggiornato dopo valutazione',
            'Risolto: artefatti nella mappa di revisione esami',
            'Migliorato rendering difetti alle alte risoluzioni'
          ]
        }
      ]
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-600 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t.changelogTitle}
            </h2>
            <p className="text-sm text-blue-200">RT Training NAS 410</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {changelog.map((release, idx) => (
            <div key={idx} className="mb-4">
              {/* Version Header */}
              <button 
                onClick={() => setExpandedVersion(expandedVersion === release.version ? null : release.version)}
                className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    v{release.version}
                  </span>
                  <span className="text-white font-medium">{release.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">{release.date}</span>
                  {expandedVersion === release.version ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {/* Version Details */}
              {expandedVersion === release.version && (
                <div className="mt-2 bg-gray-900 rounded-lg p-4 space-y-4">
                  {release.changes.map((category, cIdx) => (
                    <div key={cIdx}>
                      <h4 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
                        {category.category === 'Nuove Funzionalità' && <Lightbulb className="w-4 h-4" />}
                        {category.category === 'Bug Fix' && <Bug className="w-4 h-4" />}
                        {category.category === 'Tipi di Difetti' && <Circle className="w-4 h-4" />}
                        {category.category === 'IQI Supportati' && <Ruler className="w-4 h-4" />}
                        {category.category === 'Controlli Immagine' && <Filter className="w-4 h-4" />}
                        {category.category === 'Sistema Utenti' && <Users className="w-4 h-4" />}
                        {category.category}
                      </h4>
                      <ul className="space-y-1 ml-6">
                        {category.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-900 px-6 py-3 border-t border-gray-700 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Per segnalare bug o suggerire migliorie, usa il pulsante Feedback
          </p>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TERMS OF SERVICE MODAL
// ═══════════════════════════════════════════════════════════════════════════
const TermsOfServiceModal = ({ onClose, onAccept, showAcceptButton = false }) => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">{t.termsOfService || 'Termini di Servizio'}</h2>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-300 text-sm space-y-4">
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mb-4">
            <p className="text-blue-300 font-semibold">
              RT Training NAS 410 - Versione {APP_VERSION}
            </p>
            <p className="text-blue-400 text-xs mt-1">
              Ultimo aggiornamento: Gennaio 2026
            </p>
          </div>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Accettazione dei Termini
            </h3>
            <p>
              Utilizzando RT Training NAS 410 ("il Software"), l'utente accetta di essere vincolato dai presenti 
              Termini di Servizio. Se non si accettano questi termini, non è consentito utilizzare il Software.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Proprietà Intellettuale
            </h3>
            <p>
              Il Software, inclusi ma non limitati a codice sorgente, design, grafica, algoritmi, documentazione 
              e contenuti, è di proprietà esclusiva di <strong className="text-white">{COPYRIGHT_OWNER}</strong> ed è 
              protetto dalle leggi sul copyright italiane, europee e internazionali.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>È vietata la copia, modifica o distribuzione del Software</li>
              <li>È vietato il reverse engineering, decompilazione o disassemblaggio</li>
              <li>È vietata la rimozione di notice di copyright o marchi</li>
              <li>È vietato l'uso per sviluppare prodotti concorrenti</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
              Licenza d'Uso
            </h3>
            <p>
              Viene concessa una licenza limitata, non esclusiva, non trasferibile e revocabile per utilizzare 
              il Software esclusivamente per scopi di formazione personale o aziendale interna, secondo il piano 
              di abbonamento sottoscritto.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
              Limitazioni d'Uso - Beta Test
            </h3>
            <p>
              Questa versione Beta è fornita esclusivamente per scopi di test e valutazione. 
              L'utente Beta accetta di:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Non condividere il Software con terze parti senza autorizzazione scritta</li>
              <li>Fornire feedback costruttivo per migliorare il prodotto</li>
              <li>Non utilizzare il Software per certificazioni ufficiali</li>
              <li>Segnalare eventuali bug o vulnerabilità riscontrate</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
              Disclaimer sui Certificati
            </h3>
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
              <p className="text-yellow-300">
                <strong>IMPORTANTE:</strong> I certificati generati da questo Software hanno valore 
                esclusivamente formativo e dimostrativo. NON sostituiscono in alcun modo le certificazioni 
                ufficiali rilasciate da enti accreditati secondo lo standard NAS 410 o equivalenti.
              </p>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">6</span>
              Limitazione di Responsabilità
            </h3>
            <p>
              Il Software viene fornito "così com'è" senza garanzie di alcun tipo. {COPYRIGHT_OWNER} non sarà 
              responsabile per danni diretti, indiretti, incidentali o consequenziali derivanti dall'uso 
              o dall'impossibilità di utilizzare il Software.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">7</span>
              Privacy e Dati
            </h3>
            <p>
              I dati inseriti dall'utente (email, risultati esami) sono conservati localmente nel browser 
              e non vengono trasmessi a server esterni, ad eccezione delle funzionalità che lo richiedono 
              esplicitamente. Per maggiori informazioni, contattare: <span className="text-cyan-400">{CONTACT_EMAIL}</span>
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">8</span>
              Modifiche ai Termini
            </h3>
            <p>
              {COPYRIGHT_OWNER} si riserva il diritto di modificare questi Termini in qualsiasi momento. 
              L'uso continuato del Software dopo tali modifiche costituisce accettazione dei nuovi Termini.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-cyan-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">9</span>
              Legge Applicabile
            </h3>
            <p>
              Questi Termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente 
              il Foro di Bologna, Italia.
            </p>
          </section>
          
          <section className="border-t border-gray-700 pt-4 mt-6">
            <h3 className="text-lg font-bold text-white mb-2">Contatti</h3>
            <p>
              Per domande sui presenti Termini di Servizio o sul Software:
            </p>
            <div className="bg-gray-800 rounded-lg p-3 mt-2">
              <p className="text-white font-semibold">{COPYRIGHT_OWNER}</p>
              <p className="text-cyan-400">{CONTACT_EMAIL}</p>
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-700 px-6 py-4 bg-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{COPYRIGHT_TEXT}</p>
            <div className="flex gap-3">
              {showAcceptButton ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                  >
                    {t.decline || 'Rifiuta'}
                  </button>
                  <button
                    onClick={onAccept}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg text-white font-semibold transition flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {t.acceptTerms || 'Accetto i Termini'}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg text-white font-semibold transition"
                >
                  {t.close || 'Chiudi'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feedback Modal Component
const FeedbackModal = ({ type, onClose, t }) => {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const FEEDBACK_EMAIL = 'rtsymulationtrainingfeedback@gmail.com';
  
  const handleSend = async () => {
    // Create feedback text
    const feedbackText = 
      `${type === 'problem' ? 'BUG REPORT' : 'FEATURE REQUEST'}\n` +
      `${'='.repeat(40)}\n\n` +
      `Data: ${new Date().toLocaleString()}\n` +
      `Tipo: ${type === 'problem' ? 'Segnalazione Problema' : 'Richiesta Funzionalità'}\n` +
      (email ? `Email utente: ${email}\n` : '') +
      `\n${'='.repeat(40)}\n` +
      `DESCRIZIONE:\n\n${description}\n` +
      `\n${'='.repeat(40)}\n` +
      `Inviato da RT Training NAS 410 Beta`;
    
    // Try to copy to clipboard
    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
    } catch (err) {
      console.log('Clipboard not available');
    }
    
    // Also try mailto as fallback
    const subject = encodeURIComponent(
      type === 'problem' 
        ? `[RT Training Bug Report] ${new Date().toLocaleDateString()}`
        : `[RT Training Feature Request] ${new Date().toLocaleDateString()}`
    );
    const body = encodeURIComponent(feedbackText);
    
    // Open email client directly
    const mailtoUrl = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };
  
  const isProblem = type === 'problem';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-lg w-full mx-4">
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl text-white font-semibold mb-2">{t.feedbackSent}</p>
            {copied && (
              <p className="text-sm text-gray-400">{t.feedbackCopied || 'Feedback copiato negli appunti!'}</p>
            )}
            <p className="text-sm text-gray-400 mt-2">
              {t.feedbackEmailTo || 'Invia a'}: <span className="text-cyan-400">{FEEDBACK_EMAIL}</span>
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              {isProblem ? (
                <Bug className="w-6 h-6 text-red-400" />
              ) : (
                <Lightbulb className="w-6 h-6 text-yellow-400" />
              )}
              <h3 className="text-xl font-bold text-white">
                {isProblem ? t.feedbackProblem : t.feedbackFeature}
              </h3>
            </div>
            
            {/* Email to send to */}
            <div className="bg-gray-900 rounded-lg p-3 mb-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{t.feedbackEmailTo || 'Invia feedback a'}:</p>
              <p className="text-cyan-400 font-mono text-sm">{FEEDBACK_EMAIL}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.feedbackDescription} *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                  rows={5}
                  placeholder={isProblem ? t.feedbackProblemPlaceholder : t.feedbackFeaturePlaceholder}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.feedbackEmail}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="email@esempio.com"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSend}
                disabled={!description.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition"
              >
                <Send className="w-4 h-4" />
                {t.feedbackSend}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
              >
                {t.feedbackCancel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Simulator Component
const XRaySimulator = ({ onExamComplete }) => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const { t } = useLanguage();
  const { user, singleSession } = useAuth();
  
  // Mode: 'teaching', 'learning', 'exam'
  const [mode, setMode] = useState('teaching');
  const [material, setMaterial] = useState('aluminum');
  const [thickness, setThickness] = useState(10);
  const [kV, setKV] = useState(150);
  const [mA, setMA] = useState(5);
  const [defects, setDefects] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [markedDefects, setMarkedDefects] = useState([]);
  const [score, setScore] = useState(null);
  const [showHints, setShowHints] = useState(true);
  const [showDefectModal, setShowDefectModal] = useState(false);
  
  // Learning mode: track which defects have been identified
  const [learningFeedback, setLearningFeedback] = useState([]); // { defectId, correct, type }
  const [showMissedDefects, setShowMissedDefects] = useState(false); // Show correction overlay
  
  // Drag selection state
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [pendingSelection, setPendingSelection] = useState(null);
  
  // Image processing controls
  const [brightness, setBrightness] = useState(0);       // -100 to +100
  const [contrast, setContrast] = useState(0);           // -100 to +100
  const [zoom, setZoom] = useState(1);                   // 0.5 to 3.0
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 }); // Pan when zoomed
  
  // Right-click drag state for brightness/contrast
  const [isRightDragging, setIsRightDragging] = useState(false);
  const [rightDragStart, setRightDragStart] = useState(null);
  const [initialBrightness, setInitialBrightness] = useState(0);
  const [initialContrast, setInitialContrast] = useState(0);
  
  // DDA Calibration controls
  const [offsetCorrection, setOffsetCorrection] = useState(0);    // Dark field offset
  const [gainCorrection, setGainCorrection] = useState(1.0);      // Gain multiplier
  const [badPixelCorrection, setBadPixelCorrection] = useState(false); // Enable bad pixel interpolation
  const [calibrationApplied, setCalibrationApplied] = useState(false);
  
  // Detector type (CR vs DDA)
  const [detectorType, setDetectorType] = useState('dda'); // 'cr' or 'dda'
  
  // IQI settings
  const [iqiType, setIqiType] = useState('none'); // 'none', 'iso', 'astm'
  const [showIQI, setShowIQI] = useState(true);
  
  // Ideal parameters display
  const [showIdealParams, setShowIdealParams] = useState(false);
  
  // Training time tracking (in seconds)
  const [trainingTime, setTrainingTime] = useState(0); // Current session time
  const [totalTrainingTime, setTotalTrainingTime] = useState(0); // Accumulated time
  const [timerActive, setTimerActive] = useState(false);
  
  // Session exam count (for single session limit)
  const [sessionExamCount, setSessionExamCount] = useState(0);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const MAX_EXAMS_SINGLE_SESSION = 5;
  
  // Image polarity inversion
  const [invertedPolarity, setInvertedPolarity] = useState(false);
  
  // Seed for consistent noise pattern (changes with generateDefects)
  const [noiseSeed, setNoiseSeed] = useState(Date.now());
  
  // ASTM E1025 Hole Type IQI data (hole diameters: 1T, 2T, 4T where T = thickness)
  const astmHoles = [
    { id: '1T', factor: 1 },
    { id: '2T', factor: 2 },
    { id: '4T', factor: 4 }
  ];
  
  // ISO 19232-5 Duplex IQI data for SRb measurement
  // Each element consists of two parallel wires with diameter = spacing
  // Material: Tungsten (W) - high absorption for maximum contrast
  const duplexElements = [
    { id: 'D1', diameter: 0.80, srb: 0.80 },
    { id: 'D2', diameter: 0.63, srb: 0.63 },
    { id: 'D3', diameter: 0.50, srb: 0.50 },
    { id: 'D4', diameter: 0.40, srb: 0.40 },
    { id: 'D5', diameter: 0.32, srb: 0.32 },
    { id: 'D6', diameter: 0.25, srb: 0.25 },
    { id: 'D7', diameter: 0.20, srb: 0.20 },
    { id: 'D8', diameter: 0.16, srb: 0.16 },
    { id: 'D9', diameter: 0.13, srb: 0.13 },
    { id: 'D10', diameter: 0.10, srb: 0.10 },
    { id: 'D11', diameter: 0.08, srb: 0.08 },
    { id: 'D12', diameter: 0.063, srb: 0.063 },
    { id: 'D13', diameter: 0.05, srb: 0.05 }
  ];
  
  // Attenuation coefficients calibrated for ideal parameters
  // Formula: intensity = baseIntensity * exp(-mu * thickness) * mAFactor
  // Calibrated so that ideal kV/mA gives ~50% transmission (good contrast)
  // mu = coeff * density, where coeff decreases with higher kV (better penetration)
  const attenuationCoefficients = {
    aluminum: { 
      density: 2.7, 
      // Lower Z material - easier to penetrate
      // At ideal kV (80 + 2*thickness), coeff gives good transmission
      coeff: (kv) => Math.max(0.003, 0.015 - (kv - 80) * 0.00008)
    },
    titanium: { 
      density: 4.5, 
      // Medium Z material
      coeff: (kv) => Math.max(0.004, 0.018 - (kv - 100) * 0.00008)
    },
    inconel: { 
      density: 8.2, 
      // High Z material - harder to penetrate
      coeff: (kv) => Math.max(0.005, 0.022 - (kv - 140) * 0.00008)
    }
  };

  const generateDefects = () => {
    const numDefects = Math.floor(Math.random() * 4) + 2;
    const newDefects = [];
    // In demo mode, only 3 defect types available
    const types = user?.isDemo 
      ? ['crack', 'porosity', 'inclusion'] 
      : ['crack', 'porosity', 'cluster', 'inclusion', 'cavity'];
    
    for (let i = 0; i < numDefects; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const baseX = Math.random() * 0.6 + 0.2;
      const baseY = Math.random() * 0.6 + 0.2;
      
      switch(type) {
        case 'crack':
          // Cricche: molto sottili, lunghe, irregolari
          // Genera punti di controllo per un percorso irregolare
          const crackLength = Math.random() * 0.08 + 0.04; // 4-12% della larghezza
          const numSegments = Math.floor(Math.random() * 4) + 3; // 3-6 segmenti
          const baseAngle = Math.random() * Math.PI;
          const crackPoints = [];
          
          let cx = baseX;
          let cy = baseY;
          for (let s = 0; s <= numSegments; s++) {
            crackPoints.push({ x: cx, y: cy });
            // Deviazione casuale dall'angolo base
            const angleVar = (Math.random() - 0.5) * 0.6; // ±0.3 rad deviation
            const segLen = crackLength / numSegments;
            cx += Math.cos(baseAngle + angleVar) * segLen;
            cy += Math.sin(baseAngle + angleVar) * segLen;
          }
          
          newDefects.push({
            id: i, type: 'crack',
            x: baseX, y: baseY,
            points: crackPoints,
            width: Math.random() * 0.002 + 0.001, // Molto sottile: 0.1-0.3% 
            severity: Math.random() * 0.3 + 0.5,
            // Ramificazioni occasionali
            branches: Math.random() < 0.3 ? [{
              startIdx: Math.floor(Math.random() * (numSegments - 1)) + 1,
              angle: baseAngle + (Math.random() - 0.5) * 1.2,
              length: crackLength * 0.3,
              width: Math.random() * 0.001 + 0.0005
            }] : []
          });
          break;
          
        case 'porosity':
          // Porosità singola: piccola, leggermente irregolare
          newDefects.push({
            id: i, type: 'porosity',
            x: baseX, y: baseY,
            size: Math.random() * 0.008 + 0.003, // 0.3-1.1% - molto più piccola
            irregularity: Math.random() * 0.3 + 0.1, // Forma irregolare
            severity: Math.random() * 0.4 + 0.4
          });
          break;
          
        case 'cluster':
          // Cluster: gruppo di micro-porosità sparse
          const numPores = Math.floor(Math.random() * 12) + 5; // 5-16 micro-porosità
          const clusterRadius = Math.random() * 0.04 + 0.02; // Area del cluster
          const pores = [];
          
          for (let p = 0; p < numPores; p++) {
            // Distribuzione casuale nell'area del cluster
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * clusterRadius;
            pores.push({
              dx: Math.cos(angle) * dist,
              dy: Math.sin(angle) * dist,
              size: Math.random() * 0.004 + 0.001, // Micro: 0.1-0.5%
              severity: Math.random() * 0.3 + 0.3
            });
          }
          
          newDefects.push({
            id: i, type: 'cluster',
            x: baseX, y: baseY,
            pores: pores,
            size: clusterRadius // Per compatibilità con hints
          });
          break;
          
        case 'inclusion':
          // Inclusione: piccola, densa (più chiara), forma irregolare
          newDefects.push({
            id: i, type: 'inclusion',
            x: baseX, y: baseY,
            size: Math.random() * 0.006 + 0.002, // 0.2-0.8% - piccola
            elongation: Math.random() * 0.5 + 0.5, // Allungamento
            angle: Math.random() * Math.PI,
            irregularity: Math.random() * 0.2,
            severity: Math.random() * 0.3 + 0.4
          });
          break;
          
        case 'cavity':
          // Cavità: vuoto interno, più grande della porosità, forma irregolare allungata
          // Rappresenta mancanza di materiale (vuoto di ritiro, soffiatura grande)
          const cavityWidth = Math.random() * 0.025 + 0.015; // 1.5-4% larghezza
          const cavityHeight = Math.random() * 0.015 + 0.008; // 0.8-2.3% altezza
          const cavityAngle = Math.random() * Math.PI;
          const cavityIrregularity = Math.random() * 0.4 + 0.2;
          
          // Genera contorno irregolare per la cavità
          const numCavityPoints = Math.floor(Math.random() * 6) + 8; // 8-13 punti
          const cavityPoints = [];
          for (let cp = 0; cp < numCavityPoints; cp++) {
            const angle = (cp / numCavityPoints) * Math.PI * 2;
            const baseRadius = (Math.cos(angle) ** 2 * cavityWidth + Math.sin(angle) ** 2 * cavityHeight) * 0.5;
            const irregularRadius = baseRadius * (1 + (Math.random() - 0.5) * cavityIrregularity);
            cavityPoints.push({
              dx: Math.cos(angle + cavityAngle) * irregularRadius,
              dy: Math.sin(angle + cavityAngle) * irregularRadius
            });
          }
          
          newDefects.push({
            id: i, type: 'cavity',
            x: baseX, y: baseY,
            width: cavityWidth,
            height: cavityHeight,
            angle: cavityAngle,
            points: cavityPoints,
            irregularity: cavityIrregularity,
            severity: Math.random() * 0.3 + 0.6 // Più scuro (vuoto = meno assorbimento)
          });
          break;
      }
    }
    setDefects(newDefects);
    setNoiseSeed(Date.now());
    setZoom(1); // Reset zoom
    setPanOffset({ x: 0, y: 0 }); // Reset pan
  };
  
  // Auto calibration function
  const autoCalibrate = () => {
    // Simulate automatic calibration based on material and settings
    const materialOffsets = { aluminum: 5, titanium: 8, inconel: 12 };
    const materialGains = { aluminum: 1.05, titanium: 1.1, inconel: 1.15 };
    
    setOffsetCorrection(materialOffsets[material] || 5);
    setGainCorrection(materialGains[material] || 1.0);
    // Bad pixel correction only for DDA (CR has no pixels)
    if (detectorType === 'dda') {
      setBadPixelCorrection(true);
    }
    setCalibrationApplied(true);
  };
  
  // Reset calibration
  const resetCalibration = () => {
    setOffsetCorrection(0);
    setGainCorrection(1.0);
    setBadPixelCorrection(false);
    setCalibrationApplied(false);
    setBrightness(0);
    setContrast(0);
  };
  
  // Calculate ideal exposure parameters based on material and thickness
  const calculateIdealParams = () => {
    const materialParams = {
      aluminum: { baseKV: 80, kvPerMm: 2, basemA: 4, density: 2.7 },
      titanium: { baseKV: 100, kvPerMm: 3, basemA: 5, density: 4.5 },
      inconel: { baseKV: 140, kvPerMm: 4, basemA: 6, density: 8.2 }
    };
    
    const params = materialParams[material];
    const detectorFactor = detectorType === 'cr' ? 1.2 : 1.0; // CR needs more exposure
    
    const idealKV = Math.min(300, Math.max(50, params.baseKV + params.kvPerMm * thickness));
    const idealMA = Math.min(20, Math.max(1, params.basemA * detectorFactor * (thickness / 10)));
    const exposureTime = detectorType === 'cr' ? 
      (thickness * params.density * 0.5).toFixed(1) : 
      (thickness * params.density * 0.3).toFixed(1);
    const sfd = Math.max(600, thickness * 20 + 400); // Source-Film Distance in mm
    
    return { idealKV: Math.round(idealKV), idealMA: idealMA.toFixed(1), exposureTime, sfd };
  };
  
  // Evaluate current image quality based on settings
  const evaluateImageQuality = () => {
    const ideal = calculateIdealParams();
    const kvDiff = Math.abs(kV - ideal.idealKV);
    const maDiff = Math.abs(mA - parseFloat(ideal.idealMA));
    
    if (kvDiff < 20 && maDiff < 1) return 'optimal';
    if (kvDiff < 40 && maDiff < 2) return 'acceptable';
    if (kV > ideal.idealKV + 50) return 'overexposed';
    if (kV < ideal.idealKV - 40) return 'underexposed';
    return 'suboptimal';
  };
  
  // Calculate SRb (Spatial Resolution basic) based on detector type and image quality
  // According to ISO 19232-5
  const calculateSRb = () => {
    const quality = evaluateImageQuality();
    // Base visibility depends on detector type
    // DDA typically achieves D10-D12, CR achieves D8-D10
    let baseVisibility;
    if (detectorType === 'dda') {
      baseVisibility = quality === 'optimal' ? 11 : quality === 'acceptable' ? 10 : 8;
    } else {
      baseVisibility = quality === 'optimal' ? 9 : quality === 'acceptable' ? 8 : 6;
    }
    
    // Contrast adjustment affects visibility
    const contrastBonus = Math.floor(contrast / 40);
    const visibleElement = Math.min(13, Math.max(1, baseVisibility + contrastBonus));
    
    const element = duplexElements[visibleElement - 1];
    return {
      elementId: element.id,
      srbValue: element.srb,
      visibleCount: visibleElement
    };
  };
  
  // ISO 19232-1 Wire IQI data (wire diameters in mm)
  // Complete wire set according to ISO 19232-1
  const isoWires = {
    W1: 3.2, W2: 2.5, W3: 2.0, W4: 1.6, W5: 1.25, W6: 1.0, W7: 0.8,
    W8: 0.63, W9: 0.5, W10: 0.4, W11: 0.32, W12: 0.25, W13: 0.2,
    W14: 0.16, W15: 0.125, W16: 0.1, W17: 0.08, W18: 0.063, W19: 0.05
  };
  
  // ISO 19232-1 Wire IQI Sets (7 wires each)
  const isoWireSets = {
    set1: { name: 'Set 1 (1W)', wires: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] },
    set6: { name: 'Set 6 (6W)', wires: ['W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'] },
    set10: { name: 'Set 10 (10W)', wires: ['W10', 'W11', 'W12', 'W13', 'W14', 'W15', 'W16'] },
    set13: { name: 'Set 13 (13W)', wires: ['W13', 'W14', 'W15', 'W16', 'W17', 'W18', 'W19'] }
  };
  
  // Select appropriate IQI set based on material and thickness
  // Set 1 (coarse wires W1-W7) for THICK materials - need bigger wires for visibility
  // Set 13 (fine wires W13-W19) for THIN materials - can see finer wires
  const getIQISet = () => {
    // Calculate equivalent steel thickness for IQI selection
    const densityFactor = { aluminum: 0.35, titanium: 0.55, inconel: 1.0 };
    const equivalentThickness = thickness * (densityFactor[material] || 1);
    
    // Thicker materials → lower set number (coarser wires)
    // Thinner materials → higher set number (finer wires)
    if (equivalentThickness >= 35) return 'set1';   // Very thick → coarse wires
    if (equivalentThickness >= 20) return 'set6';   // Thick → medium-coarse
    if (equivalentThickness >= 8) return 'set10';   // Medium → medium-fine
    return 'set13';                                  // Thin → fine wires
  };
  
  // Calculate IQI visibility based on image quality
  const calculateIQIVisibility = () => {
    const quality = evaluateImageQuality();
    const currentSet = isoWireSets[getIQISet()];
    const wires = currentSet.wires;
    
    // Determine how many wires are visible based on quality
    // Better quality = more wires visible (thinner wires)
    let visibleCount;
    if (quality === 'optimal') {
      visibleCount = 7; // All wires visible
    } else if (quality === 'acceptable') {
      visibleCount = 5;
    } else if (quality === 'suboptimal') {
      visibleCount = 3;
    } else {
      visibleCount = 2;
    }
    
    // DDA has better resolution than CR
    if (detectorType === 'dda') {
      visibleCount = Math.min(7, visibleCount + 1);
    }
    
    // The thinnest visible wire
    const thinnestVisible = wires[Math.min(visibleCount - 1, 6)];
    
    // For ASTM holes: how many holes visible (1T, 2T, 4T)
    // 1T is hardest to see, 4T is easiest
    let holesVisible;
    if (quality === 'optimal') {
      holesVisible = 3; // All: 1T, 2T, 4T
    } else if (quality === 'acceptable') {
      holesVisible = 2; // 2T, 4T
    } else {
      holesVisible = 1; // Only 4T
    }
    
    // DDA bonus
    if (detectorType === 'dda' && holesVisible < 3) {
      holesVisible = Math.min(3, holesVisible + 1);
    }
    
    // ASTM penetrameter info
    const penetrameterThicknessMM = thickness * 0.02;
    const penetrameterThicknessMils = penetrameterThicknessMM * 39.37;
    const smallestHole = holesVisible === 3 ? '1T' : holesVisible === 2 ? '2T' : '4T';
    
    return { 
      visibleWire: thinnestVisible, 
      visibleCount,
      setName: currentSet.name,
      holesVisible,
      smallestHole,
      penetrameterMils: penetrameterThicknessMils.toFixed(1)
    };
  };

  useEffect(() => {
    generateDefects();
  }, [material, thickness]);

  // Disable bad pixel correction when switching to CR (CR has no pixels)
  useEffect(() => {
    if (detectorType === 'cr') {
      setBadPixelCorrection(false);
    }
  }, [detectorType]);

  // Training timer - always active when user is in app (tracks total time)
  useEffect(() => {
    let interval = null;
    
    // Timer always active when logged in
    if (timerActive) {
      interval = setInterval(() => {
        setTrainingTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  // Auto-start timer when component mounts (user logged in)
  useEffect(() => {
    setTimerActive(true);
    return () => {
      // When leaving app, save accumulated time
      if (trainingTime > 0) {
        setTotalTrainingTime(prev => prev + trainingTime);
      }
    };
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}${t.hours} ${mins.toString().padStart(2, '0')}${t.minutes} ${secs.toString().padStart(2, '0')}${t.seconds}`;
    }
    return `${mins}${t.minutes} ${secs.toString().padStart(2, '0')}${t.seconds}`;
  };

  const calculateIntensity = (baseIntensity, localThickness, defectFactor = 1) => {
    const matData = attenuationCoefficients[material];
    const mu = matData.coeff(kV) * matData.density;
    const effectiveThickness = localThickness * defectFactor;
    
    // Beer-Lambert law with mA correction
    // Higher mA = more photons = brighter image
    const mAFactor = Math.pow(mA / 5, 0.7);  // mA influence on exposure
    const transmission = Math.exp(-mu * effectiveThickness);
    
    // Scale intensity: at ideal params, transmission ~0.3-0.6 gives good contrast
    const intensity = baseIntensity * transmission * mAFactor;
    
    return Math.max(0, Math.min(255, intensity));
  };

  // Get canvas coordinates from mouse event
  // Handles object-contain scaling and centering properly
  const getCanvasCoords = (e) => {
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Canvas internal dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Displayed dimensions
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    
    // Calculate the actual rendered size with object-contain
    const canvasAspect = canvasWidth / canvasHeight;
    const displayAspect = displayWidth / displayHeight;
    
    let renderWidth, renderHeight, offsetX, offsetY;
    
    if (displayAspect > canvasAspect) {
      // Display is wider - canvas is fitted by height
      renderHeight = displayHeight;
      renderWidth = displayHeight * canvasAspect;
      offsetX = (displayWidth - renderWidth) / 2;
      offsetY = 0;
    } else {
      // Display is taller - canvas is fitted by width
      renderWidth = displayWidth;
      renderHeight = displayWidth / canvasAspect;
      offsetX = 0;
      offsetY = (displayHeight - renderHeight) / 2;
    }
    
    // Mouse position relative to the canvas element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to canvas internal coordinates
    let x = ((mouseX - offsetX) / renderWidth) * canvasWidth;
    let y = ((mouseY - offsetY) / renderHeight) * canvasHeight;
    
    // Clamp coordinates to canvas bounds
    x = Math.max(0, Math.min(canvasWidth, x));
    y = Math.max(0, Math.min(canvasHeight, y));
    
    return { x, y };
  };

  // Mouse handlers for drag selection and brightness/contrast control
  const handleMouseDown = (e) => {
    // Right-click for brightness/contrast control
    if (e.button === 2) {
      e.preventDefault();
      setIsRightDragging(true);
      setRightDragStart({ x: e.clientX, y: e.clientY });
      setInitialBrightness(brightness);
      setInitialContrast(contrast);
      return;
    }
    
    // Left-click for selection (learning or exam mode when started)
    if ((mode !== 'exam' && mode !== 'learning') || !examStarted || showDefectModal) return;
    
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setSelectionStart(coords);
    setSelectionEnd(coords);
  };

  const handleMouseMove = (e) => {
    // Handle right-drag for brightness/contrast
    if (isRightDragging && rightDragStart) {
      const deltaX = e.clientX - rightDragStart.x;
      const deltaY = e.clientY - rightDragStart.y;
      
      // Horizontal movement = contrast, Vertical movement = brightness
      const newContrast = Math.max(-100, Math.min(100, initialContrast + deltaX * 0.5));
      const newBrightness = Math.max(-100, Math.min(100, initialBrightness - deltaY * 0.5));
      
      setContrast(Math.round(newContrast));
      setBrightness(Math.round(newBrightness));
      return;
    }
    
    // Handle left-drag for selection
    if (!isDrawing) return;
    
    const coords = getCanvasCoords(e);
    setSelectionEnd(coords);
  };

  const handleMouseUp = (e) => {
    // End right-drag
    if (e.button === 2 || isRightDragging) {
      setIsRightDragging(false);
      setRightDragStart(null);
      return;
    }
    
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    if (!selectionStart || !selectionEnd) return;
    
    // Calculate selection rectangle
    const minX = Math.min(selectionStart.x, selectionEnd.x);
    const minY = Math.min(selectionStart.y, selectionEnd.y);
    const maxX = Math.max(selectionStart.x, selectionEnd.x);
    const maxY = Math.max(selectionStart.y, selectionEnd.y);
    const width = maxX - minX;
    const height = maxY - minY;
    
    // Minimum selection size (10px)
    if (width < 10 || height < 10) {
      setSelectionStart(null);
      setSelectionEnd(null);
      return;
    }
    
    // Store the selection and show modal
    setPendingSelection({
      x: minX,
      y: minY,
      width,
      height,
      centerX: minX + width / 2,
      centerY: minY + height / 2
    });
    setShowDefectModal(true);
  };
  
  // Wheel handler for zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3.0, zoom + delta));
    setZoom(newZoom);
    
    // Reset pan when zoom returns to 1
    if (newZoom === 1) {
      setPanOffset({ x: 0, y: 0 });
    }
  };
  
  // Prevent context menu on canvas
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setSelectionStart(null);
      setSelectionEnd(null);
    }
    if (isRightDragging) {
      setIsRightDragging(false);
      setRightDragStart(null);
    }
  };

  const handleDefectTypeConfirm = (identifiedType) => {
    if (!pendingSelection) return;
    
    const canvas = canvasRef.current;
    const normalizedCenterX = pendingSelection.centerX / canvas.width;
    const normalizedCenterY = pendingSelection.centerY / canvas.height;
    const normalizedWidth = pendingSelection.width / canvas.width;
    const normalizedHeight = pendingSelection.height / canvas.height;
    
    // Get list of already matched defect IDs
    const alreadyMatchedIds = markedDefects
      .filter(m => m.matchedDefect)
      .map(m => m.matchedDefect.id);
    
    // Find if selection contains a real defect (not already matched)
    let matchedDefect = null;
    let isCorrectType = false;
    
    defects.forEach(defect => {
      // Skip if this defect was already matched by another selection
      if (alreadyMatchedIds.includes(defect.id)) return;
      
      // Check if defect center is within selection area
      const selNormX = pendingSelection.x / canvas.width;
      const selNormY = pendingSelection.y / canvas.height;
      const selNormWidth = pendingSelection.width / canvas.width;
      const selNormHeight = pendingSelection.height / canvas.height;
      
      if (defect.x >= selNormX && defect.x <= selNormX + selNormWidth &&
          defect.y >= selNormY && defect.y <= selNormY + selNormHeight) {
        matchedDefect = defect;
        isCorrectType = identifiedType === defect.type;
      }
    });
    
    const newMark = {
      // Rectangle bounds
      rectX: pendingSelection.x,
      rectY: pendingSelection.y,
      rectWidth: pendingSelection.width,
      rectHeight: pendingSelection.height,
      // Normalized values
      normalizedX: normalizedCenterX,
      normalizedY: normalizedCenterY,
      normalizedWidth,
      normalizedHeight,
      // Defect info
      identifiedType,
      matchedDefect,
      isCorrectType
    };
    
    setMarkedDefects([...markedDefects, newMark]);
    setShowDefectModal(false);
    setPendingSelection(null);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleDefectTypeCancel = () => {
    setShowDefectModal(false);
    setPendingSelection(null);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const deleteMarkedDefect = (index) => {
    const newMarked = [...markedDefects];
    newMarked.splice(index, 1);
    setMarkedDefects(newMarked);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;
    
    const ctx = canvas.getContext('2d');
    const octx = overlayCanvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    octx.clearRect(0, 0, width, height);
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const baseIntensity = 255;  // Maximum intensity for proper exposure
    
    // ============================================
    // REALISTIC RADIOGRAPHY NOISE MODEL
    // Supports both CR (Computed Radiography) and DDA (Digital Detector Array)
    // ============================================
    
    // Seeded random number generator for consistent noise patterns
    // Uses mulberry32 algorithm
    const seededRandom = (seed) => {
      return () => {
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    };
    
    const rand = seededRandom(noiseSeed);
    
    // Detector-specific noise parameters
    const noiseParams = detectorType === 'cr' ? {
      // CR (Computed Radiography) - Phosphor plate characteristics
      // CR uses phosphor plates, NOT pixel detectors - no hot/dead pixels possible
      quantumNoiseBase: 10,           // Reduced quantum noise for better defect visibility
      electronicNoise: 4,             // Scanner readout noise
      fixedPatternNoise: 0.008,       // Lower FPN (no pixel structure)
      hotPixelProb: 0,                // NO hot pixels in CR (no pixel detector)
      deadPixelProb: 0,               // NO dead pixels in CR (no pixel detector)
      darkCurrentNoise: 2,            // Phosphor afterglow
      columnNoiseProb: 0.005,         // Scanner line artifacts
      rowNoiseProb: 0.003,            // Fewer row artifacts
      grainNoiseBase: 8,              // Reduced phosphor grain structure
      scratchProb: 0.0005,            // Plate scratches (CR specific)
      responseGamma: 0.85             // Slightly non-linear response
    } : {
      // DDA (Digital Detector Array) - Flat panel characteristics
      quantumNoiseBase: 6,            // Reduced quantum noise for better defect visibility
      electronicNoise: 3,             // Readout electronics noise
      fixedPatternNoise: 0.01,        // Fixed pattern noise
      hotPixelProb: 0.0003,           // Hot pixels (DDA specific)
      deadPixelProb: 0.0002,          // Dead pixels (DDA specific)
      darkCurrentNoise: 1.5,          // Dark current
      columnNoiseProb: 0.015,         // Column defects
      rowNoiseProb: 0.01,             // Row defects
      grainNoiseBase: 0,              // No grain structure
      scratchProb: 0,                 // No scratches
      responseGamma: 1.0              // Linear response
    };
    
    // Box-Muller transform for Gaussian random numbers (using seeded random)
    const gaussianRandom = () => {
      let u1, u2;
      do { u1 = rand(); } while (u1 === 0);
      u2 = rand();
      return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };
    
    // Pre-generate fixed pattern noise (detector-specific, consistent per component)
    const columnPattern = new Float32Array(width);
    const rowPattern = new Float32Array(height);
    const noisyColumns = new Set();
    const noisyRows = new Set();
    
    // Pre-generate CR-specific grain pattern
    const grainPattern = detectorType === 'cr' ? new Float32Array(width * height) : null;
    const scratchLines = [];
    
    if (detectorType === 'cr') {
      // Generate phosphor grain structure
      for (let i = 0; i < width * height; i++) {
        grainPattern[i] = (rand() - 0.5) * noiseParams.grainNoiseBase;
      }
      // Generate random scratches on CR plate
      const numScratches = Math.floor(rand() * 3);
      for (let s = 0; s < numScratches; s++) {
        if (rand() < 0.3) {
          scratchLines.push({
            startX: rand() * width,
            startY: rand() * height,
            angle: rand() * Math.PI,
            length: rand() * 200 + 50,
            intensity: rand() * 20 + 10
          });
        }
      }
    }
    
    for (let x = 0; x < width; x++) {
      columnPattern[x] = (rand() - 0.5) * 2 * noiseParams.fixedPatternNoise;
      if (rand() < noiseParams.columnNoiseProb) noisyColumns.add(x);
    }
    for (let y = 0; y < height; y++) {
      rowPattern[y] = (rand() - 0.5) * 2 * noiseParams.fixedPatternNoise;
      if (rand() < noiseParams.rowNoiseProb) noisyRows.add(y);
    }
    
    // Pre-generate hot/dead pixel map (consistent per component)
    const hotPixels = new Set();
    const deadPixels = new Set();
    for (let i = 0; i < width * height; i++) {
      if (rand() < noiseParams.hotPixelProb) hotPixels.add(i);
      if (rand() < noiseParams.deadPixelProb) deadPixels.add(i);
    }
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const pixelIdx = y * width + x;
        const nx = x / width;
        const ny = y / height;
        
        const edgeFactor = 1 + 0.3 * Math.pow(Math.abs(nx - 0.5) * 2, 2);
        let localThickness = thickness * edgeFactor;
        
        let defectFactor = 1;
        defects.forEach(defect => {
          const dx = nx - defect.x;
          const dy = ny - defect.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          switch(defect.type) {
            case 'crack':
              // Cricca irregolare: controlla vicinanza a ciascun segmento
              if (defect.points && defect.points.length > 1) {
                for (let s = 0; s < defect.points.length - 1; s++) {
                  const p1 = defect.points[s];
                  const p2 = defect.points[s + 1];
                  
                  // Distanza punto-segmento
                  const segDx = p2.x - p1.x;
                  const segDy = p2.y - p1.y;
                  const segLen = Math.sqrt(segDx * segDx + segDy * segDy);
                  
                  if (segLen > 0) {
                    // Proiezione del punto sul segmento
                    const t = Math.max(0, Math.min(1, 
                      ((nx - p1.x) * segDx + (ny - p1.y) * segDy) / (segLen * segLen)
                    ));
                    const projX = p1.x + t * segDx;
                    const projY = p1.y + t * segDy;
                    const distToSeg = Math.sqrt((nx - projX) ** 2 + (ny - projY) ** 2);
                    
                    // Larghezza variabile lungo la cricca (più sottile verso le estremità)
                    const widthMod = 1 - 0.5 * Math.abs(t - 0.5) * 2;
                    const effectiveWidth = defect.width * widthMod;
                    
                    if (distToSeg < effectiveWidth) {
                      // Intensità che sfuma ai bordi
                      const edgeFade = 1 - (distToSeg / effectiveWidth);
                      defectFactor *= (1 - defect.severity * edgeFade * 0.85);
                    }
                  }
                }
                
                // Ramificazioni
                if (defect.branches) {
                  defect.branches.forEach(branch => {
                    if (branch.startIdx < defect.points.length) {
                      const startPt = defect.points[branch.startIdx];
                      const endX = startPt.x + Math.cos(branch.angle) * branch.length;
                      const endY = startPt.y + Math.sin(branch.angle) * branch.length;
                      
                      const bDx = endX - startPt.x;
                      const bDy = endY - startPt.y;
                      const bLen = Math.sqrt(bDx * bDx + bDy * bDy);
                      
                      if (bLen > 0) {
                        const t = Math.max(0, Math.min(1,
                          ((nx - startPt.x) * bDx + (ny - startPt.y) * bDy) / (bLen * bLen)
                        ));
                        const projX = startPt.x + t * bDx;
                        const projY = startPt.y + t * bDy;
                        const distToBranch = Math.sqrt((nx - projX) ** 2 + (ny - projY) ** 2);
                        
                        if (distToBranch < branch.width) {
                          const edgeFade = 1 - (distToBranch / branch.width);
                          defectFactor *= (1 - defect.severity * edgeFade * 0.7);
                        }
                      }
                    }
                  });
                }
              }
              break;
              
            case 'porosity':
              // Porosità singola con forma leggermente irregolare
              if (defect.size) {
                // Distorsione della forma circolare
                const angleToCenter = Math.atan2(dy, dx);
                const irregularDist = dist * (1 + defect.irregularity * 
                  Math.sin(angleToCenter * 5) * Math.cos(angleToCenter * 3));
                
                if (irregularDist < defect.size) {
                  // Sfumatura dal centro verso i bordi
                  const normalizedDist = irregularDist / defect.size;
                  const intensity = (1 - normalizedDist) * (1 - normalizedDist); // Quadratico
                  defectFactor *= (1 - defect.severity * intensity * 0.92);  // +15% contrast
                }
              }
              break;
              
            case 'cluster':
              // Cluster di micro-porosità
              if (defect.pores) {
                defect.pores.forEach(pore => {
                  const poreDx = nx - (defect.x + pore.dx);
                  const poreDy = ny - (defect.y + pore.dy);
                  const poreDist = Math.sqrt(poreDx * poreDx + poreDy * poreDy);
                  
                  if (poreDist < pore.size) {
                    const normalizedDist = poreDist / pore.size;
                    const intensity = (1 - normalizedDist);
                    defectFactor *= (1 - pore.severity * intensity * 0.805);  // +15% contrast
                  }
                });
              }
              break;
              
            case 'inclusion':
              // Inclusione: più densa, quindi PIÙ CHIARA (defectFactor > 1)
              if (defect.size) {
                // Forma ellittica irregolare
                const cosA = Math.cos(defect.angle);
                const sinA = Math.sin(defect.angle);
                const rotX = dx * cosA + dy * sinA;
                const rotY = -dx * sinA + dy * cosA;
                
                // Ellisse con elongazione
                const ellipseDist = Math.sqrt(
                  (rotX / defect.size) ** 2 + 
                  (rotY / (defect.size * defect.elongation)) ** 2
                );
                
                // Leggera irregolarità
                const angleToCenter = Math.atan2(rotY, rotX);
                const irregularEllipse = ellipseDist * (1 + defect.irregularity * 
                  Math.sin(angleToCenter * 4));
                
                if (irregularEllipse < 1) {
                  const normalizedDist = irregularEllipse;
                  const intensity = (1 - normalizedDist) * (1 - normalizedDist * 0.5);
                  // Inclusioni sono PIÙ DENSE = più chiare nella radiografia
                  defectFactor *= (1 + defect.severity * intensity * 1.5);  // High contrast - white inclusions
                }
              }
              break;
              
            case 'cavity':
              // Cavità: vuoto interno, forma irregolare, PIÙ SCURO (meno assorbimento)
              if (defect.points && defect.points.length > 2) {
                // Controlla se il punto è dentro il poligono della cavità
                const cavityPoints = defect.points;
                let inside = false;
                
                for (let ci = 0, cj = cavityPoints.length - 1; ci < cavityPoints.length; cj = ci++) {
                  const xi = defect.x + cavityPoints[ci].dx;
                  const yi = defect.y + cavityPoints[ci].dy;
                  const xj = defect.x + cavityPoints[cj].dx;
                  const yj = defect.y + cavityPoints[cj].dy;
                  
                  if (((yi > ny) !== (yj > ny)) && (nx < (xj - xi) * (ny - yi) / (yj - yi) + xi)) {
                    inside = !inside;
                  }
                }
                
                if (inside) {
                  // Calcola distanza dal centro per sfumatura
                  const normalizedDist = dist / Math.max(defect.width, defect.height);
                  const intensity = Math.max(0, 1 - normalizedDist * 0.8);
                  // Cavità = vuoto = meno assorbimento = PIÙ SCURO
                  defectFactor *= (1 - defect.severity * intensity * 0.85);
                }
              }
              break;
          }
        });
        
        let intensity = calculateIntensity(baseIntensity, localThickness, defectFactor);
        
        // Apply detector-specific response curve
        if (noiseParams.responseGamma !== 1.0) {
          intensity = Math.pow(intensity / 255, noiseParams.responseGamma) * 255;
        }
        
        // Check for dead/hot pixels first
        if (deadPixels.has(pixelIdx)) {
          intensity = 0;
        } else if (hotPixels.has(pixelIdx)) {
          intensity = 255;
        } else {
          // 1. Quantum noise (shot noise) - proportional to sqrt(signal)
          // Higher in brighter areas (more photons = more variation)
          const signalLevel = intensity / 255;
          const quantumNoise = gaussianRandom() * noiseParams.quantumNoiseBase * Math.sqrt(signalLevel + 0.1);
          
          // 2. Electronic noise (readout noise) - constant Gaussian
          const readoutNoise = gaussianRandom() * noiseParams.electronicNoise;
          
          // 3. Dark current noise - slightly intensity-dependent
          const darkNoise = gaussianRandom() * noiseParams.darkCurrentNoise * (1 - signalLevel * 0.5);
          
          // 4. Fixed pattern noise (column + row)
          const fpnContribution = (columnPattern[x] + rowPattern[y]) * 255;
          
          // 5. Noisy column/row enhancement
          let structuralNoise = 0;
          if (noisyColumns.has(x)) {
            structuralNoise += gaussianRandom() * 8 + 3; // Noisy column offset
          }
          if (noisyRows.has(y)) {
            structuralNoise += gaussianRandom() * 6 + 2; // Noisy row offset
          }
          
          // 6. CR-specific grain noise (phosphor structure)
          let grainNoise = 0;
          if (detectorType === 'cr' && grainPattern) {
            grainNoise = grainPattern[pixelIdx] * (1 + signalLevel * 0.5);
          }
          
          // 7. CR-specific scratch artifacts
          let scratchNoise = 0;
          if (detectorType === 'cr') {
            scratchLines.forEach(scratch => {
              const dx = x - scratch.startX;
              const dy = y - scratch.startY;
              const alongLine = dx * Math.cos(scratch.angle) + dy * Math.sin(scratch.angle);
              const perpLine = Math.abs(-dx * Math.sin(scratch.angle) + dy * Math.cos(scratch.angle));
              if (alongLine > 0 && alongLine < scratch.length && perpLine < 2) {
                scratchNoise += scratch.intensity * (1 - perpLine / 2);
              }
            });
          }
          
          // Combine all noise sources
          const totalNoise = quantumNoise + readoutNoise + darkNoise + fpnContribution + structuralNoise + grainNoise + scratchNoise;
          intensity += totalNoise;
          
          // Occasional salt-and-pepper noise (ADC glitches)
          if (rand() < 0.0001) {
            intensity = rand() < 0.5 ? intensity + 40 : intensity - 40;
          }
        }
        
        intensity = Math.max(0, Math.min(255, intensity));
        
        // Apply slight vignetting effect (typical of flat panel detectors)
        const vignetteFactor = 1 - 0.08 * (Math.pow(nx - 0.5, 2) + Math.pow(ny - 0.5, 2)) * 4;
        intensity *= vignetteFactor;
        
        // ============================================
        // DDA CALIBRATION CORRECTIONS
        // ============================================
        
        // 1. Offset Correction (Dark Field Subtraction)
        // Removes fixed dark current and electronic offset
        intensity = intensity - offsetCorrection;
        
        // 2. Gain Correction (Flat Field Normalization)
        // Normalizes pixel-to-pixel sensitivity variations
        intensity = intensity * gainCorrection;
        
        // 3. Bad Pixel Correction (interpolation from neighbors)
        // If enabled, interpolate hot/dead pixels from surrounding pixels
        if (badPixelCorrection && (deadPixels.has(pixelIdx) || hotPixels.has(pixelIdx))) {
          // Simple interpolation: average of horizontal neighbors
          // In real systems, more sophisticated algorithms are used
          let neighborSum = 0;
          let neighborCount = 0;
          
          if (x > 0) {
            const leftIdx = pixelIdx - 1;
            if (!deadPixels.has(leftIdx) && !hotPixels.has(leftIdx)) {
              neighborSum += calculateIntensity(baseIntensity, thickness * (1 + 0.3 * Math.pow(Math.abs((x-1)/width - 0.5) * 2, 2)), 1);
              neighborCount++;
            }
          }
          if (x < width - 1) {
            const rightIdx = pixelIdx + 1;
            if (!deadPixels.has(rightIdx) && !hotPixels.has(rightIdx)) {
              neighborSum += calculateIntensity(baseIntensity, thickness * (1 + 0.3 * Math.pow(Math.abs((x+1)/width - 0.5) * 2, 2)), 1);
              neighborCount++;
            }
          }
          if (y > 0) {
            const topIdx = pixelIdx - width;
            if (!deadPixels.has(topIdx) && !hotPixels.has(topIdx)) {
              neighborSum += calculateIntensity(baseIntensity, thickness * (1 + 0.3 * Math.pow(Math.abs(nx - 0.5) * 2, 2)), 1);
              neighborCount++;
            }
          }
          if (y < height - 1) {
            const bottomIdx = pixelIdx + width;
            if (!deadPixels.has(bottomIdx) && !hotPixels.has(bottomIdx)) {
              neighborSum += calculateIntensity(baseIntensity, thickness * (1 + 0.3 * Math.pow(Math.abs(nx - 0.5) * 2, 2)), 1);
              neighborCount++;
            }
          }
          
          if (neighborCount > 0) {
            intensity = (neighborSum / neighborCount) * gainCorrection - offsetCorrection;
          }
        }
        
        // ============================================
        // IMAGE PROCESSING ADJUSTMENTS
        // ============================================
        
        // 4. Brightness adjustment (linear shift)
        intensity = intensity + (brightness * 2.55); // Convert -100..100 to -255..255
        
        // 5. Contrast adjustment (stretch around midpoint)
        // Formula: output = ((input - 128) * contrastFactor) + 128
        const contrastFactor = (100 + contrast) / 100; // 0..2 range
        intensity = ((intensity - 128) * contrastFactor) + 128;
        
        // Final clamp
        intensity = Math.max(0, Math.min(255, intensity));
        
        // Apply radiographic display
        // Normal: inverted (darker = more material absorption)
        // Inverted polarity: positive (lighter = more material)
        const displayIntensity = invertedPolarity ? intensity : (255 - intensity);
        
        data[idx] = displayIntensity * 0.75;
        data[idx + 1] = displayIntensity * 0.95;
        data[idx + 2] = displayIntensity * 0.85;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // ============================================
    // IQI (Image Quality Indicator) RENDERING
    // ============================================
    if (iqiType !== 'none' && showIQI) {
      const iqiX = width - 120; // Position on right side
      const iqiY = 30;
      
      if (iqiType === 'iso') {
        // ISO 19232-1 Wire Type IQI
        const currentSetKey = getIQISet();
        const currentSet = isoWireSets[currentSetKey];
        const wires = currentSet.wires;
        const iqiVisibility = calculateIQIVisibility();
        
        // Draw IQI frame (plastic holder)
        const frameHeight = 110;
        ctx.fillStyle = 'rgba(60, 60, 60, 0.95)';
        ctx.fillRect(iqiX - 15, iqiY - 10, 110, frameHeight);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(iqiX - 15, iqiY - 10, 110, frameHeight);
        
        // Draw 7 wires - thickest at top (inside), thinnest at bottom (outside/edge)
        const wireSpacing = 12;
        const visibleWires = [];
        
        wires.forEach((wireId, idx) => {
          const wireDiameter = isoWires[wireId];
          const wireY = iqiY + idx * wireSpacing;
          
          // Scale wire thickness for visibility (min 1px, max based on diameter)
          const wireThickness = Math.max(1, Math.min(6, wireDiameter * 3));
          
          // Calculate if this wire is visible based on quality
          const isVisible = idx < iqiVisibility.visibleCount;
          if (isVisible) visibleWires.push(wireId);
          
          // Wires are MORE DENSE than background, so they appear LIGHTER
          // (less X-ray transmission = lighter on radiograph)
          // Background is the dark film, wires block radiation = white/light
          const baseGray = 90; // Background gray level
          const wireIntensity = isVisible ? 
            Math.min(255, baseGray + 80 + (6 - idx) * 15) : // Visible: bright white
            baseGray + 30; // Not visible: barely distinguishable
          
          ctx.strokeStyle = `rgb(${wireIntensity}, ${wireIntensity}, ${wireIntensity})`;
          ctx.lineWidth = wireThickness;
          ctx.beginPath();
          ctx.moveTo(iqiX, wireY);
          ctx.lineTo(iqiX + 65, wireY);
          ctx.stroke();
          
          // Wire label on the right
          ctx.fillStyle = isVisible ? 'rgba(255, 255, 255, 0.9)' : 'rgba(150, 150, 150, 0.6)';
          ctx.font = isVisible ? 'bold 9px monospace' : '8px monospace';
          ctx.fillText(wireId, iqiX + 70, wireY + 3);
        });
        
        // IQI set label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('ISO 19232-1', iqiX - 10, iqiY + frameHeight - 25);
        ctx.font = '8px monospace';
        ctx.fillText(currentSet.name, iqiX - 10, iqiY + frameHeight - 13);
        
        // Thinnest visible wire indicator
        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        ctx.font = 'bold 8px monospace';
        const thinnestVisible = visibleWires[visibleWires.length - 1] || wires[0];
        ctx.fillText(`→ ${thinnestVisible}`, iqiX + 70, iqiY + frameHeight - 13);
        
      } else if (iqiType === 'astm') {
        // ASTM E1025 Hole Type IQI (Penetrameter)
        // Penetrameter thickness = 2% of material thickness
        const penetrameterThicknessMM = thickness * 0.02;
        const penetrameterThicknessMils = penetrameterThicknessMM * 39.37; // Convert to mils (thousandths of inch)
        
        // T = penetrameter thickness, holes are 1T, 2T, 4T diameter
        const T = penetrameterThicknessMM;
        const holes = [
          { id: '1T', diameter: T * 1 },
          { id: '2T', diameter: T * 2 },
          { id: '4T', diameter: T * 4 }
        ];
        
        // Draw IQI plate (penetrameter) - appears lighter than background (more material)
        const plateWidth = 90;
        const plateHeight = 55;
        const plateGray = 160; // Plate is lighter (more dense, less transmission)
        
        ctx.fillStyle = `rgb(${plateGray}, ${plateGray}, ${plateGray})`;
        ctx.fillRect(iqiX - 15, iqiY - 5, plateWidth, plateHeight);
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(iqiX - 15, iqiY - 5, plateWidth, plateHeight);
        
        // Calculate hole visibility based on image quality
        const quality = evaluateImageQuality();
        let visibleHoleCount;
        if (quality === 'optimal') {
          visibleHoleCount = 3; // All holes visible (1T, 2T, 4T)
        } else if (quality === 'acceptable') {
          visibleHoleCount = 2; // 2T and 4T visible
        } else {
          visibleHoleCount = 1; // Only 4T visible
        }
        
        // DDA has better resolution
        if (detectorType === 'dda' && visibleHoleCount < 3) {
          visibleHoleCount = Math.min(3, visibleHoleCount + 1);
        }
        
        // Draw holes - DARKER than plate (less material = more X-ray transmission = darker)
        const holeSpacing = 25;
        const visibleHoles = [];
        
        holes.forEach((hole, idx) => {
          const holeX = iqiX + 10 + idx * holeSpacing;
          const holeY = iqiY + 22;
          
          // Scale hole radius for display (min 3px, max 12px)
          const holeRadius = Math.max(3, Math.min(12, hole.diameter * 8));
          
          // Hole visibility: 4T is easiest (idx=2), 1T is hardest (idx=0)
          // visibleHoleCount=1 means only 4T, =2 means 2T+4T, =3 means all
          const isVisible = (2 - idx) < visibleHoleCount;
          if (isVisible) visibleHoles.push(hole.id);
          
          // Holes are DARKER than plate (more transmission through hole)
          // Visible holes have good contrast, invisible ones blend with plate
          const holeGray = isVisible ? 
            Math.max(40, plateGray - 80 - (2 - idx) * 20) : // Darker = more visible
            plateGray - 20; // Barely visible
          
          ctx.fillStyle = `rgb(${holeGray}, ${holeGray}, ${holeGray})`;
          ctx.beginPath();
          ctx.arc(holeX, holeY, holeRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Hole border for clarity
          ctx.strokeStyle = isVisible ? 'rgba(60, 60, 60, 0.8)' : 'rgba(120, 120, 120, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Hole label
          ctx.fillStyle = isVisible ? 'rgba(255, 255, 255, 0.9)' : 'rgba(180, 180, 180, 0.5)';
          ctx.font = isVisible ? 'bold 9px monospace' : '8px monospace';
          ctx.fillText(hole.id, holeX - 6, holeY + holeRadius + 12);
        });
        
        // IQI identification label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('ASTM E1025', iqiX - 10, iqiY - 10);
        
        // Penetrameter thickness info
        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.fillText(`2% = ${penetrameterThicknessMils.toFixed(1)} mils`, iqiX - 10, iqiY + plateHeight + 5);
        
        // Visible holes indicator
        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        ctx.font = 'bold 8px monospace';
        const smallestVisible = visibleHoles[0] || '—';
        ctx.fillText(`→ ${smallestVisible}`, iqiX + 55, iqiY + plateHeight + 5);
        
      } else if (iqiType === 'duplex') {
        // ISO 19232-5 Duplex IQI for SRb measurement
        // Two IQI blocks: one vertical (3.5° from vertical), one horizontal (3.5° from horizontal)
        const srbInfo = calculateSRb();
        const angleOffset = 3.5 * Math.PI / 180; // 3.5 degrees in radians
        
        // Tungsten has very high absorption - wires appear WHITE (blocking X-rays)
        const tungstenGray = 255; // Maximum brightness (high absorption)
        const bgGray = 70; // Dark background of the IQI holder
        
        // Function to draw one duplex IQI block
        const drawDuplexBlock = (startX, startY, rotation, label) => {
          ctx.save();
          ctx.translate(startX, startY);
          ctx.rotate(rotation);
          
          // Draw holder background
          const holderWidth = 35;
          const holderHeight = 145; // Increased to fit all 13 elements
          ctx.fillStyle = `rgb(${bgGray}, ${bgGray}, ${bgGray})`;
          ctx.fillRect(-holderWidth/2, -10, holderWidth, holderHeight);
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
          ctx.lineWidth = 1;
          ctx.strokeRect(-holderWidth/2, -10, holderWidth, holderHeight);
          
          // Draw duplex elements (pairs of wires) - all 13 elements D1-D13
          const elementSpacing = 8.5; // Slightly reduced to fit all 13
          const wireLength = 25;
          
          duplexElements.forEach((element, idx) => {
            const elementY = idx * elementSpacing;
            const wireThickness = Math.max(1, element.diameter * 4); // Scale for visibility
            const spacing = wireThickness; // In duplex, spacing = wire diameter
            
            // Check if this element is visible based on SRb
            const isVisible = idx < srbInfo.visibleCount;
            
            // Wire brightness - tungsten is very bright (high absorption)
            // Visible wires show clear separation, invisible ones blur together
            const wireGray = isVisible ? tungstenGray : tungstenGray - 40;
            
            // Draw the two parallel wires
            ctx.strokeStyle = `rgb(${wireGray}, ${wireGray}, ${wireGray})`;
            ctx.lineWidth = wireThickness;
            
            // First wire
            ctx.beginPath();
            ctx.moveTo(-wireLength/2, elementY - spacing/2);
            ctx.lineTo(wireLength/2, elementY - spacing/2);
            ctx.stroke();
            
            // Second wire
            ctx.beginPath();
            ctx.moveTo(-wireLength/2, elementY + spacing/2);
            ctx.lineTo(wireLength/2, elementY + spacing/2);
            ctx.stroke();
            
            // Element label (every other one to avoid clutter)
            if (idx % 2 === 0) {
              ctx.fillStyle = isVisible ? 'rgba(255, 255, 255, 0.9)' : 'rgba(150, 150, 150, 0.5)';
              ctx.font = '7px monospace';
              ctx.fillText(element.id, wireLength/2 + 3, elementY + 2);
            }
          });
          
          // Block label
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.font = 'bold 8px monospace';
          ctx.fillText(label, -holderWidth/2 + 2, holderHeight - 5);
          
          ctx.restore();
        };
        
        // Draw vertical duplex (rotated 3.5° clockwise from vertical)
        const vDuplexX = width - 60;
        const vDuplexY = 80;
        drawDuplexBlock(vDuplexX, vDuplexY, angleOffset, 'V');
        
        // Draw horizontal duplex (rotated 3.5° from horizontal = 90° + 3.5°)
        const hDuplexX = width - 130;
        const hDuplexY = 60;
        drawDuplexBlock(hDuplexX, hDuplexY, Math.PI/2 + angleOffset, 'H');
        
        // SRb measurement result label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('ISO 19232-5', width - 145, 25);
        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        ctx.fillText(`SRb = ${srbInfo.srbValue} mm (${srbInfo.elementId})`, width - 145, 38);
      } else if (iqiType === 'all') {
        // Teaching mode: show ALL IQI types for educational purposes
        
        // 1. ISO 19232-1 Wire Type IQI (top right)
        const wireIqiX = width - 120;
        const wireIqiY = 20;
        const currentSetKey = getIQISet();
        const currentSet = isoWireSets[currentSetKey];
        const wires = currentSet.wires;
        
        ctx.fillStyle = 'rgba(60, 60, 60, 0.95)';
        ctx.fillRect(wireIqiX - 10, wireIqiY - 5, 100, 95);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
        ctx.strokeRect(wireIqiX - 10, wireIqiY - 5, 100, 95);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('ISO 19232-1 Wire', wireIqiX, wireIqiY + 5);
        
        wires.forEach((wireId, idx) => {
          const wireDiameter = isoWires[wireId];
          const wireY = wireIqiY + 15 + idx * 10;
          const wireThickness = Math.max(1, Math.min(5, wireDiameter * 3));
          ctx.strokeStyle = `rgb(${200 + idx * 5}, ${200 + idx * 5}, ${200 + idx * 5})`;
          ctx.lineWidth = wireThickness;
          ctx.beginPath();
          ctx.moveTo(wireIqiX + 5, wireY);
          ctx.lineTo(wireIqiX + 55, wireY);
          ctx.stroke();
          ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
          ctx.font = '7px monospace';
          ctx.fillText(`W${wireId}`, wireIqiX + 60, wireY + 3);
        });
        
        // 2. ASTM E1025 Hole Type IQI (bottom right)
        const holeIqiX = width - 120;
        const holeIqiY = 125;
        
        ctx.fillStyle = 'rgba(50, 50, 50, 0.95)';
        ctx.fillRect(holeIqiX - 10, holeIqiY - 5, 100, 65);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
        ctx.strokeRect(holeIqiX - 10, holeIqiY - 5, 100, 65);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('ASTM E1025 Hole', holeIqiX, holeIqiY + 5);
        
        astmHoles.forEach((hole, idx) => {
          const holeDiameter = hole.factor * (thickness * 0.01) * 10;
          const holeY = holeIqiY + 20 + idx * 15;
          const radius = Math.max(3, Math.min(8, holeDiameter));
          ctx.strokeStyle = 'rgba(30, 30, 30, 0.9)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(holeIqiX + 20, holeY, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
          ctx.font = '8px monospace';
          ctx.fillText(hole.id, holeIqiX + 40, holeY + 3);
        });
        
        // 3. ISO 19232-5 Duplex (top left area)
        const duplexIqiX = width - 200;
        const duplexIqiY = 20;
        
        ctx.fillStyle = 'rgba(60, 60, 60, 0.95)';
        ctx.fillRect(duplexIqiX - 10, duplexIqiY - 5, 70, 100);
        ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
        ctx.strokeRect(duplexIqiX - 10, duplexIqiY - 5, 70, 100);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 7px monospace';
        ctx.fillText('Duplex SRb', duplexIqiX, duplexIqiY + 5);
        
        // Draw simplified duplex elements
        duplexElements.slice(0, 8).forEach((element, idx) => {
          const elementY = duplexIqiY + 15 + idx * 10;
          const wireThickness = Math.max(1, element.diameter * 3);
          ctx.strokeStyle = 'rgba(220, 220, 220, 0.9)';
          ctx.lineWidth = wireThickness;
          // Two parallel lines
          ctx.beginPath();
          ctx.moveTo(duplexIqiX + 5, elementY - wireThickness/2);
          ctx.lineTo(duplexIqiX + 35, elementY - wireThickness/2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(duplexIqiX + 5, elementY + wireThickness/2);
          ctx.lineTo(duplexIqiX + 35, elementY + wireThickness/2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(180, 180, 180, 0.7)';
          ctx.font = '6px monospace';
          ctx.fillText(element.id, duplexIqiX + 42, elementY + 2);
        });
      }
    }
    
    // Draw teaching mode hints (highlighted defects)
    if (mode === 'teaching') {
      defects.forEach(defect => {
        // Bright yellow outline for teaching mode
        octx.strokeStyle = 'rgba(255, 220, 0, 0.9)';
        octx.lineWidth = 3;
        octx.setLineDash([8, 4]);
        octx.beginPath();
        
        if (defect.type === 'crack' && defect.points) {
          const points = defect.points;
          if (points.length > 0) {
            octx.moveTo(points[0].x * width, points[0].y * height);
            for (let i = 1; i < points.length; i++) {
              octx.lineTo(points[i].x * width, points[i].y * height);
            }
            if (defect.branches) {
              defect.branches.forEach(branch => {
                if (branch.startIdx < points.length) {
                  const startPt = points[branch.startIdx];
                  octx.moveTo(startPt.x * width, startPt.y * height);
                  const endX = startPt.x + Math.cos(branch.angle) * branch.length;
                  const endY = startPt.y + Math.sin(branch.angle) * branch.length;
                  octx.lineTo(endX * width, endY * height);
                }
              });
            }
          }
        } else if (defect.type === 'cluster' && defect.pores) {
          const clusterRadius = defect.size || 0.03;
          octx.arc(defect.x * width, defect.y * height, clusterRadius * width, 0, Math.PI * 2);
        } else if (defect.type === 'inclusion' && defect.elongation) {
          const radiusX = (defect.size || 0.01) * width;
          const radiusY = radiusX * defect.elongation;
          octx.save();
          octx.translate(defect.x * width, defect.y * height);
          octx.rotate(defect.angle || 0);
          octx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
          octx.restore();
        } else if (defect.type === 'cavity' && defect.points) {
          // Draw cavity outline
          octx.moveTo((defect.x + defect.points[0].dx) * width, (defect.y + defect.points[0].dy) * height);
          defect.points.forEach((pt, i) => {
            if (i > 0) octx.lineTo((defect.x + pt.dx) * width, (defect.y + pt.dy) * height);
          });
          octx.closePath();
        } else {
          const radius = (defect.size || 0.01) * width;
          octx.arc(defect.x * width, defect.y * height, radius, 0, Math.PI * 2);
        }
        octx.stroke();
        octx.setLineDash([]);
        
        // Label with yellow background - use translations
        const label = (t[defect.type] || defect.type).toUpperCase();
        const labelX = defect.x * width + 15;
        const labelY = defect.y * height - 15;
        
        ctx.fillStyle = 'rgba(255, 220, 0, 0.9)';
        ctx.fillRect(labelX - 2, labelY - 10, label.length * 7 + 4, 14);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(label, labelX, labelY);
      });
    }
    
    // Draw learning mode hints (semi-transparent, helps locate but doesn't reveal)
    if (mode === 'learning' && showHints && !examStarted) {
      defects.forEach(defect => {
        octx.strokeStyle = 'rgba(255, 80, 80, 0.7)';
        octx.lineWidth = 2;
        octx.setLineDash([5, 5]);
        octx.beginPath();
        
        if (defect.type === 'crack' && defect.points) {
          // Disegna il percorso della cricca
          const points = defect.points;
          if (points.length > 0) {
            octx.moveTo(points[0].x * width, points[0].y * height);
            for (let i = 1; i < points.length; i++) {
              octx.lineTo(points[i].x * width, points[i].y * height);
            }
            // Disegna anche le ramificazioni
            if (defect.branches) {
              defect.branches.forEach(branch => {
                if (branch.startIdx < points.length) {
                  const startPt = points[branch.startIdx];
                  octx.moveTo(startPt.x * width, startPt.y * height);
                  const endX = startPt.x + Math.cos(branch.angle) * branch.length;
                  const endY = startPt.y + Math.sin(branch.angle) * branch.length;
                  octx.lineTo(endX * width, endY * height);
                }
              });
            }
          }
        } else if (defect.type === 'cluster' && defect.pores) {
          // Disegna un cerchio attorno all'area del cluster
          const clusterRadius = defect.size || 0.03;
          octx.arc(defect.x * width, defect.y * height, clusterRadius * width, 0, Math.PI * 2);
        } else if (defect.type === 'inclusion' && defect.elongation) {
          // Disegna un'ellisse per l'inclusione
          const radiusX = (defect.size || 0.01) * width;
          const radiusY = radiusX * defect.elongation;
          octx.save();
          octx.translate(defect.x * width, defect.y * height);
          octx.rotate(defect.angle || 0);
          octx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
          octx.restore();
        } else {
          // Porosità singola o fallback
          const radius = (defect.size || 0.01) * width;
          octx.arc(defect.x * width, defect.y * height, radius, 0, Math.PI * 2);
        }
        octx.stroke();
        octx.setLineDash([]);
        
        // Etichetta del tipo di difetto - use translations
        octx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        octx.font = 'bold 10px monospace';
        octx.fillText((t[defect.type] || defect.type).toUpperCase(), defect.x * width + 15, defect.y * height - 10);
      });
    }
    
    // Draw marked defects (selection rectangles) - different behavior per mode
    if ((mode === 'learning' || mode === 'exam') && examStarted) {
      markedDefects.forEach((mark, idx) => {
        let strokeColor, fillColor, showCorrection = false;
        
        if (mode === 'learning') {
          // Learning mode: immediate feedback
          if (mark.matchedDefect) {
            if (mark.isCorrectType) {
              // Correct position AND type = green
              strokeColor = 'rgba(0, 255, 100, 0.9)';
              fillColor = 'rgba(0, 255, 100, 0.2)';
            } else {
              // Correct position, wrong type = red with correction
              strokeColor = 'rgba(255, 80, 80, 0.9)';
              fillColor = 'rgba(255, 80, 80, 0.2)';
              showCorrection = true;
            }
          } else {
            // False positive = red
            strokeColor = 'rgba(255, 80, 80, 0.9)';
            fillColor = 'rgba(255, 80, 80, 0.2)';
          }
        } else if (mode === 'exam') {
          // Exam mode: neutral color during exam, no feedback
          if (!score) {
            // During exam - neutral blue
            strokeColor = 'rgba(100, 150, 255, 0.9)';
            fillColor = 'rgba(100, 150, 255, 0.15)';
          } else {
            // After evaluation - show results
            if (mark.matchedDefect) {
              if (mark.isCorrectType) {
                strokeColor = 'rgba(0, 255, 100, 0.9)';
                fillColor = 'rgba(0, 255, 100, 0.15)';
              } else {
                strokeColor = 'rgba(255, 200, 0, 0.9)';
                fillColor = 'rgba(255, 200, 0, 0.15)';
              }
            } else {
              strokeColor = 'rgba(255, 80, 80, 0.9)';
              fillColor = 'rgba(255, 80, 80, 0.15)';
            }
          }
        }
        
        // Draw filled rectangle
        octx.fillStyle = fillColor;
        octx.fillRect(mark.rectX, mark.rectY, mark.rectWidth, mark.rectHeight);
        
        // Draw rectangle border
        octx.strokeStyle = strokeColor;
        octx.lineWidth = 2;
        octx.strokeRect(mark.rectX, mark.rectY, mark.rectWidth, mark.rectHeight);
        
        // Draw number label
        octx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        octx.fillRect(mark.rectX, mark.rectY - 22, 24, 20);
        octx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        octx.font = 'bold 14px monospace';
        octx.fillText((idx + 1).toString(), mark.rectX + 6, mark.rectY - 6);
        
        // Draw defect type label
        octx.font = 'bold 10px monospace';
        octx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        const typeLabel = t[mark.identifiedType] || mark.identifiedType;
        const labelWidth = octx.measureText(typeLabel).width + 8;
        octx.fillRect(mark.rectX + mark.rectWidth + 4, mark.rectY, labelWidth, 18);
        octx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        octx.fillText(typeLabel, mark.rectX + mark.rectWidth + 8, mark.rectY + 13);
        
        // Show correction for learning mode
        if (showCorrection && mark.matchedDefect) {
          const correctType = t[mark.matchedDefect.type] || mark.matchedDefect.type;
          const correctionText = `→ ${correctType}`;
          const corrWidth = octx.measureText(correctionText).width + 8;
          octx.fillStyle = 'rgba(0, 200, 100, 0.9)';
          octx.fillRect(mark.rectX + mark.rectWidth + 4, mark.rectY + 20, corrWidth, 18);
          octx.fillStyle = 'rgba(255, 255, 255, 1)';
          octx.font = 'bold 10px monospace';
          octx.fillText(correctionText, mark.rectX + mark.rectWidth + 8, mark.rectY + 33);
        }
      });
      
      // Draw missed defects overlay in learning mode when showMissedDefects is active
      if (mode === 'learning' && showMissedDefects && examStarted) {
        const foundDefectIds = markedDefects.filter(m => m.matchedDefect).map(m => m.matchedDefect.id);
        const missedDefects = defects.filter(d => !foundDefectIds.includes(d.id));
        
        missedDefects.forEach((defect, idx) => {
          const x = defect.x + (defect.width / 2);
          const y = defect.y + (defect.height / 2);
          const radius = Math.max(defect.width, defect.height) * 0.7;
          
          // Draw pulsing orange circle around missed defect
          octx.beginPath();
          octx.arc(x, y, radius, 0, Math.PI * 2);
          octx.strokeStyle = 'rgba(255, 150, 0, 0.9)';
          octx.lineWidth = 3;
          octx.setLineDash([8, 4]);
          octx.stroke();
          octx.setLineDash([]);
          
          // Draw inner highlight
          octx.beginPath();
          octx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
          octx.fillStyle = 'rgba(255, 150, 0, 0.15)';
          octx.fill();
          
          // Draw defect type label
          const typeLabel = t[defect.type] || defect.type;
          octx.font = 'bold 11px monospace';
          const labelWidth = octx.measureText(typeLabel).width + 12;
          
          // Background for label
          octx.fillStyle = 'rgba(255, 100, 0, 0.9)';
          octx.fillRect(x - labelWidth/2, y - radius - 25, labelWidth, 20);
          
          // Arrow pointing down
          octx.beginPath();
          octx.moveTo(x - 6, y - radius - 5);
          octx.lineTo(x + 6, y - radius - 5);
          octx.lineTo(x, y - radius + 5);
          octx.closePath();
          octx.fillStyle = 'rgba(255, 100, 0, 0.9)';
          octx.fill();
          
          // Label text
          octx.fillStyle = 'white';
          octx.textAlign = 'center';
          octx.fillText(typeLabel, x, y - radius - 10);
          octx.textAlign = 'left';
          
          // Number badge
          octx.beginPath();
          octx.arc(x + radius, y - radius, 12, 0, Math.PI * 2);
          octx.fillStyle = 'rgba(255, 100, 0, 1)';
          octx.fill();
          octx.fillStyle = 'white';
          octx.font = 'bold 12px sans-serif';
          octx.textAlign = 'center';
          octx.fillText((idx + 1).toString(), x + radius, y - radius + 4);
          octx.textAlign = 'left';
        });
      }
    }
    
    // Draw current selection while dragging
    if (isDrawing && selectionStart && selectionEnd) {
      const minX = Math.min(selectionStart.x, selectionEnd.x);
      const minY = Math.min(selectionStart.y, selectionEnd.y);
      const selWidth = Math.abs(selectionEnd.x - selectionStart.x);
      const selHeight = Math.abs(selectionEnd.y - selectionStart.y);
      
      octx.fillStyle = 'rgba(100, 150, 255, 0.2)';
      octx.fillRect(minX, minY, selWidth, selHeight);
      
      octx.strokeStyle = 'rgba(100, 150, 255, 0.9)';
      octx.lineWidth = 2;
      octx.setLineDash([5, 5]);
      octx.strokeRect(minX, minY, selWidth, selHeight);
      octx.setLineDash([]);
    }
    
  }, [material, thickness, kV, mA, defects, mode, showHints, markedDefects, examStarted, t, isDrawing, selectionStart, selectionEnd, brightness, contrast, offsetCorrection, gainCorrection, badPixelCorrection, noiseSeed, detectorType, iqiType, showIQI, learningFeedback, score, invertedPolarity, showMissedDefects]);

  // Auto-update ideal params in teaching mode when material/thickness changes
  useEffect(() => {
    if (mode === 'teaching') {
      const ideal = calculateIdealParams();
      setKV(ideal.idealKV);
      setMA(parseFloat(ideal.idealMA));
    }
  }, [material, thickness, detectorType, mode]);

  // Handle mode change
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setExamStarted(false);
    setScore(null);
    setMarkedDefects([]);
    setLearningFeedback([]);
    setShowMissedDefects(false);
    
    if (newMode === 'teaching') {
      // Apply ideal parameters automatically
      const ideal = calculateIdealParams();
      setKV(ideal.idealKV);
      setMA(parseFloat(ideal.idealMA));
      // Show all IQI types in teaching mode
      setIqiType('all');
      setShowIQI(true);
      // Optimize brightness/contrast for viewing
      setBrightness(0);
      setContrast(10);
      // Generate defects for demonstration
      generateDefects();
    } else if (newMode === 'learning') {
      // Reset IQI to ISO default
      setIqiType('iso');
    } else if (newMode === 'exam') {
      // Reset IQI to none for exam
      setIqiType('none');
    }
  };
  
  // Start learning session
  const startLearningSession = () => {
    setExamStarted(true);
    setMarkedDefects([]);
    setLearningFeedback([]);
    setShowMissedDefects(false);
    setScore(null);
    generateDefects();
  };

  const startExam = () => {
    setExamStarted(true);
    setMarkedDefects([]);
    setScore(null);
    generateDefects();
  };

  const generateCertificate = async (user, exam) => {
    const certText = `
═══════════════════════════════════════════════════════
          CERTIFICATO DI COMPLETAMENTO
           Programma Training RT NAS 410
═══════════════════════════════════════════════════════

Si certifica che

              ${user.username}
              
ha completato con successo l'esame di Radiografia
Digitale (RT) Non-Distruttiva secondo lo standard
NAS 410.

Data Esame: ${new Date(exam.date).toLocaleDateString()}
Punteggio Finale: ${exam.score}%

Materiale Testato: ${exam.material}
Spessore: ${exam.thickness}mm
Parametri: ${exam.kV}kV, ${exam.mA}mA

Difetti identificati: ${exam.detected}/${exam.total}
Precisione classificazione: ${exam.classificationAccuracy}%

Questo certificato dimostra competenza in:
• Interpretazione immagini radiografiche digitali
• Riconoscimento e classificazione difetti
• Valutazione qualità IQI
• Procedure conformi NAS 410

Autorizzato da: Sistema Training RT
ID Certificato: ${user.id}-${exam.date}

═══════════════════════════════════════════════════════
        Valido solo per scopi formativi
     Non valido per certificazione ufficiale
═══════════════════════════════════════════════════════
  `;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificato_RT_${user.username}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const evaluateExam = async () => {
    let correctPosition = 0;
    let correctType = 0;
    let totalMarked = markedDefects.length;
    
    // Check each marked defect
    markedDefects.forEach(mark => {
      if (mark.matchedDefect) {
        correctPosition++;
        if (mark.isCorrectType) {
          correctType++;
        }
      }
    });
    
    const totalDefects = defects.length;
    const detectionRate = totalDefects > 0 ? (correctPosition / totalDefects) * 100 : 0;
    const classificationAccuracy = totalMarked > 0 ? (correctType / totalMarked) * 100 : 0;
    const falsePositives = totalMarked - correctPosition;
    
    // Scoring: 50% position, 30% classification, 20% false positives penalty
    const positionScore = detectionRate * 0.5;
    const classificationScore = classificationAccuracy * 0.3;
    const falsePositivesPenalty = Math.max(0, 20 - (falsePositives * 5));
    
    const finalScore = positionScore + classificationScore + falsePositivesPenalty;
    
    // Build set of detected defect IDs
    const detectedDefectIds = new Set();
    markedDefects.forEach(md => {
      if (md.matchedDefect) {
        detectedDefectIds.add(md.matchedDefect.id);
      }
    });
    
    const examResult = {
      date: new Date().toISOString(),
      score: finalScore.toFixed(1),
      detected: correctPosition,
      total: totalDefects,
      correctType,
      falsePositives,
      classificationAccuracy: classificationAccuracy.toFixed(1),
      material,
      thickness,
      kV,
      mA,
      // Training time in seconds (accumulated before exam)
      trainingTimeSeconds: totalTrainingTime,
      trainingTimeFormatted: formatTime(totalTrainingTime),
      // Review data
      reviewData: {
        defects: defects.map(d => ({
          id: d.id,
          type: d.type,
          x: d.x,
          y: d.y,
          size: d.size || d.width || 0.02,
          detected: detectedDefectIds.has(d.id)
        })),
        markedDefects: markedDefects.map(md => ({
          id: md.id,
          type: md.identifiedType,
          x: md.normalizedX,  // Fixed: was normalizedCenterX
          y: md.normalizedY,  // Fixed: was normalizedCenterY
          width: md.normalizedWidth,
          height: md.normalizedHeight,
          isCorrectPosition: md.matchedDefect !== null,
          isCorrectType: md.matchedDefect !== null && md.identifiedType === md.matchedDefect.type,
          actualType: md.matchedDefect?.type || null
        }))
      }
    };
    
    setScore(examResult);
    
    // Increment session exam count for single session users
    if (user?.isSingleSession && !user?.isDemo) {
      setSessionExamCount(prev => prev + 1);
      // Show promo modal after delay to let user see results first
      setTimeout(() => setShowPromoModal(true), 4000);
    }
    
    if (onExamComplete) {
      onExamComplete(examResult);
    }
    
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const users = JSON.parse(usersResult.value);
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          if (!users[userIndex].exams) {
            users[userIndex].exams = [];
          }
          users[userIndex].exams.push(examResult);
          await storage.set('users_db', JSON.stringify(users));
        }
      }
    } catch (err) {
      console.error('Save exam error:', err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-950 h-full overflow-hidden">
      {showDefectModal && (
        <DefectTypeModal
          selectionArea={pendingSelection}
          onConfirm={handleDefectTypeConfirm}
          onCancel={handleDefectTypeCancel}
          t={t}
          isDemo={user?.isDemo}
        />
      )}
      
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center gap-4 flex-wrap">
        <div className="flex gap-1">
          <button 
            onClick={() => handleModeChange('teaching')} 
            className={`flex items-center gap-2 px-3 py-2 rounded-l text-sm font-semibold transition ${mode === 'teaching' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            title={t.teachingDesc}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{t.teaching}</span>
          </button>
          <button 
            onClick={() => handleModeChange('learning')} 
            className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition ${mode === 'learning' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            title={t.learningDesc}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">{t.learning}</span>
          </button>
          {user?.isDemo ? (
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-r text-sm font-semibold bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-600"
              title={t.examDisabledDemo || 'Modalità Esame disponibile con sessione completa'}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span className="hidden sm:inline">{t.exam}</span>
              <span className="text-xs bg-yellow-600 text-white px-1 rounded">PRO</span>
            </div>
          ) : (
            <button 
              onClick={() => handleModeChange('exam')} 
              className={`flex items-center gap-2 px-3 py-2 rounded-r text-sm font-semibold transition ${mode === 'exam' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              title={t.examDesc}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span className="hidden sm:inline">{t.exam}</span>
            </button>
          )}
        </div>
        
        {/* Mode description */}
        <span className="text-xs text-gray-400 hidden lg:inline">
          {mode === 'teaching' && t.teachingDesc}
          {mode === 'learning' && t.learningDesc}
          {mode === 'exam' && t.examDesc}
        </span>
        
        {/* Training Time Display - visible in teaching and learning modes */}
        {(mode === 'teaching' || mode === 'learning') && (
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${timerActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-xs text-gray-400">{t.sessionTime}:</span>
              <span className="text-sm font-mono text-white">{formatTime(trainingTime)}</span>
            </div>
            {totalTrainingTime > 0 && (
              <div className="border-l border-gray-600 pl-2 flex items-center gap-1">
                <span className="text-xs text-gray-400">{t.totalTrainingTime}:</span>
                <span className="text-sm font-mono text-cyan-400">{formatTime(totalTrainingTime + trainingTime)}</span>
              </div>
            )}
          </div>
        )}

        {mode === 'exam' && (
          <div className="ml-auto flex gap-2 items-center">
            {/* Exam count for single session */}
            {user?.isSingleSession && !user?.isDemo && (
              <span className="text-xs text-gray-400 mr-2">
                {t.examsUsed || 'Esami'}: {sessionExamCount}/{MAX_EXAMS_SINGLE_SESSION}
              </span>
            )}
            
            {!examStarted ? (
              // Check if single session has reached exam limit
              user?.isSingleSession && !user?.isDemo && sessionExamCount >= MAX_EXAMS_SINGLE_SESSION ? (
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded text-gray-400">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{t.examLimitReached || 'Limite esami raggiunto'}</span>
                </div>
              ) : (
                <button onClick={startExam} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold">
                  <Play className="w-4 h-4" />
                  {t.start}
                </button>
              )
            ) : !score && (
              <button onClick={evaluateExam} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded font-semibold">
                {t.evaluate}
              </button>
            )}
          </div>
        )}
        
        {mode === 'learning' && !examStarted && (
          <div className="ml-auto">
            <button onClick={startLearningSession} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold">
              <Play className="w-4 h-4" />
              {t.start}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 space-y-4 flex-shrink-0">
          
          {/* Detector Type Selection */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <label className="block text-sm font-bold text-cyan-400 mb-2">{t.detectorType}</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="detectorType" 
                  value="dda" 
                  checked={detectorType === 'dda'} 
                  onChange={(e) => setDetectorType(e.target.value)}
                  className="w-4 h-4 accent-cyan-500"
                  disabled={examStarted}
                />
                <div>
                  <span className="text-sm font-medium">{t.ddaSystem}</span>
                  <p className="text-xs text-gray-400">Flat panel, linear response</p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="detectorType" 
                  value="cr" 
                  checked={detectorType === 'cr'} 
                  onChange={(e) => setDetectorType(e.target.value)}
                  className="w-4 h-4 accent-cyan-500"
                  disabled={examStarted}
                />
                <div>
                  <span className="text-sm font-medium">{t.crSystem}</span>
                  <p className="text-xs text-gray-400">Phosphor plate, wider latitude</p>
                </div>
              </label>
            </div>
          </div>

          {/* IQI Selection */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <label className="block text-sm font-bold text-yellow-400 mb-2">{t.iqi}</label>
            <select 
              value={iqiType} 
              onChange={(e) => setIqiType(e.target.value)} 
              className="w-full bg-gray-700 rounded px-3 py-2 text-white border border-gray-600 text-sm"
            >
              <option value="none">{t.iqi_none}</option>
              <option value="iso">{t.iqi_iso}</option>
              {!user?.isDemo && (
                <>
                  <option value="astm">{t.iqi_astm}</option>
                  <option value="duplex">{t.iqi_duplex}</option>
                </>
              )}
            </select>
            {user?.isDemo && (
              <p className="text-xs text-yellow-500 mt-1">{t.moreIqiWithPro || 'IQI avanzati con sessione completa'}</p>
            )}
            {iqiType !== 'none' && (
              <div className="mt-2 p-2 bg-gray-800 rounded text-xs space-y-1">
                {iqiType === 'iso' && (() => {
                  const iqiInfo = calculateIQIVisibility();
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Set:</span>
                        <span className="text-yellow-300 font-medium">{iqiInfo.setName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.wireVisible}:</span>
                        <span className="text-green-400 font-medium">{iqiInfo.visibleWire}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.wiresVisibleCount}:</span>
                        <span className="text-white">{iqiInfo.visibleCount}/7</span>
                      </div>
                    </>
                  );
                })()}
                {iqiType === 'astm' && (() => {
                  const iqiInfo = calculateIQIVisibility();
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">2% T:</span>
                        <span className="text-yellow-300 font-medium">{iqiInfo.penetrameterMils} mils</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.holeVisible}:</span>
                        <span className="text-green-400 font-medium">{iqiInfo.smallestHole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fori visibili:</span>
                        <span className="text-white">{iqiInfo.holesVisible}/3</span>
                      </div>
                    </>
                  );
                })()}
                {iqiType === 'duplex' && (() => {
                  const srbInfo = calculateSRb();
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.duplexVisible}:</span>
                        <span className="text-yellow-300 font-medium">{srbInfo.elementId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.srb}:</span>
                        <span className="text-green-400 font-medium">{srbInfo.srbValue} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.duplexOrientation}:</span>
                        <span className="text-white">3.5° V + H</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <label className="block text-sm font-medium mb-2">{t.material}</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-gray-800 rounded px-3 py-2 text-white border border-gray-700" disabled={examStarted}>
              <option value="aluminum">{t.aluminium}</option>
              <option value="titanium">{t.titanium}</option>
              {!user?.isDemo && (
                <option value="inconel">{t.inconel}</option>
              )}
            </select>
            {user?.isDemo && (
              <p className="text-xs text-yellow-500 mt-1">{t.moreMaterialsWithPro || 'Altri materiali con sessione completa'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.thickness}: {thickness} mm</label>
            <input type="range" min="5" max="50" step="1" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} className="w-full" disabled={examStarted} />
          </div>

          {/* kV and mA controls - hidden in teaching mode (auto-ideal) */}
          {mode !== 'teaching' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">{t.voltage}: {kV}</label>
                <input type="range" min="50" max="300" step="10" value={kV} onChange={(e) => setKV(parseFloat(e.target.value))} className="w-full" disabled={mode === 'teaching'} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.current}: {mA}</label>
                <input type="range" min="1" max="20" step="0.5" value={mA} onChange={(e) => setMA(parseFloat(e.target.value))} className="w-full" disabled={mode === 'teaching'} />
              </div>
            </>
          )}
          
          {/* Teaching mode: show current ideal settings */}
          {mode === 'teaching' && (
            <div className="bg-purple-900/30 border border-purple-600/50 rounded-lg p-3">
              <h3 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Parametri Automatici (Ideali)
              </h3>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-400">kV:</span> <span className="text-white font-medium">{kV}</span></p>
                <p><span className="text-gray-400">mA:</span> <span className="text-white font-medium">{mA}</span></p>
              </div>
            </div>
          )}

          <button onClick={generateDefects} disabled={examStarted} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition disabled:opacity-50">
            <RefreshCw className="w-4 h-4" />
            {t.newComponent}
          </button>

          {/* Show Ideal Parameters Toggle - only in learning mode, not in demo */}
          {mode === 'learning' && !user?.isDemo && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showIdealParams} 
                onChange={(e) => setShowIdealParams(e.target.checked)} 
                className="w-4 h-4 accent-yellow-500" 
              />
              <span className="text-sm text-yellow-400">{t.showIdealParams}</span>
            </label>
          )}
          {mode === 'learning' && user?.isDemo && (
            <div className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
              <input type="checkbox" disabled className="w-4 h-4" />
              <span className="text-sm">{t.showIdealParams}</span>
              <span className="text-xs bg-yellow-600 text-white px-1 rounded">PRO</span>
            </div>
          )}

          {/* Ideal Parameters Panel */}
          {showIdealParams && (
            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3">
              <h3 className="text-sm font-bold text-yellow-400 mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {t.idealParameters}
              </h3>
              
              {(() => {
                const ideal = calculateIdealParams();
                const quality = evaluateImageQuality();
                const qualityColors = {
                  optimal: 'text-green-400',
                  acceptable: 'text-blue-400',
                  suboptimal: 'text-yellow-400',
                  overexposed: 'text-red-400',
                  underexposed: 'text-orange-400'
                };
                
                return (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.idealKV}:</span>
                      <span className="text-white font-mono">{ideal.idealKV} kV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.idealMA}:</span>
                      <span className="text-white font-mono">{ideal.idealMA} mA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.exposureTime}:</span>
                      <span className="text-white font-mono">{ideal.exposureTime} s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.sfd}:</span>
                      <span className="text-white font-mono">{ideal.sfd} mm</span>
                    </div>
                    
                    <div className="border-t border-yellow-600/30 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.currentSettings}:</span>
                        <span className="text-white font-mono">{kV} kV, {mA} mA</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-400">{t.quality}:</span>
                        <span className={`font-bold ${qualityColors[quality]}`}>
                          {t[quality]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Learning Mode Progress Panel */}
          {mode === 'learning' && examStarted && (
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-3">
              <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t.learningProgress || 'Progresso'}
              </h3>
              
              {(() => {
                // Calculate learning stats
                const totalDefects = defects.length;
                const foundDefects = markedDefects.filter(m => m.matchedDefect).length;
                const correctType = markedDefects.filter(m => m.matchedDefect && m.isCorrectType).length;
                const wrongType = markedDefects.filter(m => m.matchedDefect && !m.isCorrectType).length;
                const falsePositives = markedDefects.filter(m => !m.matchedDefect).length;
                const missedDefects = totalDefects - foundDefects;
                
                // Get list of missed defect IDs
                const foundDefectIds = markedDefects.filter(m => m.matchedDefect).map(m => m.matchedDefect.id);
                const missedDefectsList = defects.filter(d => !foundDefectIds.includes(d.id));
                
                return (
                  <div className="space-y-3">
                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{t.defectsFound || 'Difetti trovati'}</span>
                        <span className="text-white font-bold">{foundDefects}/{totalDefects}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${totalDefects > 0 ? (foundDefects / totalDefects) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-green-900/30 rounded p-2 text-center">
                        <p className="text-green-400 font-bold text-lg">{correctType}</p>
                        <p className="text-green-300">{t.correct || 'Corretti'}</p>
                      </div>
                      <div className="bg-yellow-900/30 rounded p-2 text-center">
                        <p className="text-yellow-400 font-bold text-lg">{wrongType}</p>
                        <p className="text-yellow-300">{t.wrongType || 'Tipo errato'}</p>
                      </div>
                      <div className="bg-red-900/30 rounded p-2 text-center">
                        <p className="text-red-400 font-bold text-lg">{falsePositives}</p>
                        <p className="text-red-300">{t.falsePositives || 'Falsi positivi'}</p>
                      </div>
                      <div className="bg-gray-700/50 rounded p-2 text-center">
                        <p className="text-gray-300 font-bold text-lg">{missedDefects}</p>
                        <p className="text-gray-400">{t.missed || 'Mancanti'}</p>
                      </div>
                    </div>
                    
                    {/* Show Correction Button */}
                    <button 
                      onClick={() => setShowMissedDefects(!showMissedDefects)}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded font-medium text-sm transition ${
                        showMissedDefects 
                          ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      }`}
                    >
                      {showMissedDefects ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          {t.hideCorrection || 'Nascondi Correzione'}
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          {t.showCorrection || 'Mostra Correzione'}
                        </>
                      )}
                    </button>
                    
                    {/* Missed defects list */}
                    {showMissedDefects && missedDefectsList.length > 0 && (
                      <div className="bg-orange-900/20 border border-orange-600/30 rounded p-2">
                        <p className="text-xs text-orange-400 font-semibold mb-2">
                          {t.missedDefects || 'Difetti mancanti'}:
                        </p>
                        <div className="space-y-1">
                          {missedDefectsList.map((d, i) => (
                            <div key={d.id} className="text-xs flex items-center gap-2 text-orange-300">
                              <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold" style={{fontSize: '10px'}}>
                                {i + 1}
                              </span>
                              <span>{t[d.type] || d.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* All found message */}
                    {foundDefects === totalDefects && totalDefects > 0 && (
                      <div className="bg-green-900/30 border border-green-600/50 rounded p-2 text-center">
                        <p className="text-green-400 font-semibold text-sm flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          {t.allDefectsFound || 'Tutti i difetti trovati!'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Image Processing Controls */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {t.imageProcessing}
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">
                  {t.brightness}: {brightness > 0 ? '+' : ''}{brightness}
                </label>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  step="5" 
                  value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">
                  {t.contrast}: {contrast > 0 ? '+' : ''}{contrast}
                </label>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  step="5" 
                  value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              
              {/* Polarity Inversion Button */}
              <button 
                onClick={() => setInvertedPolarity(!invertedPolarity)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded font-medium transition ${
                  invertedPolarity 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                {t.invertPolarity}: {invertedPolarity ? t.polarityInverted : t.polarityNormal}
              </button>
            </div>
          </div>

          {/* DDA Calibration Controls */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t.ddaCalibration}
              {calibrationApplied && (
                <span className="ml-auto text-xs bg-green-600 px-2 py-0.5 rounded">✓</span>
              )}
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">
                  {t.offsetCorrection}: {offsetCorrection}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="1" 
                  value={offsetCorrection} 
                  onChange={(e) => setOffsetCorrection(parseInt(e.target.value))} 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Dark field subtraction</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">
                  {t.gainCorrection}: {gainCorrection.toFixed(2)}x
                </label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.05" 
                  value={gainCorrection} 
                  onChange={(e) => setGainCorrection(parseFloat(e.target.value))} 
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Flat field normalization</p>
              </div>
              
              {/* Bad Pixel Correction - Only for DDA (CR has no pixels) */}
              {detectorType === 'dda' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={badPixelCorrection} 
                    onChange={(e) => setBadPixelCorrection(e.target.checked)} 
                    className="w-4 h-4 accent-green-500" 
                  />
                  <span className="text-xs text-gray-300">{t.badPixelCorrection}</span>
                </label>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={autoCalibrate}
                  className="flex-1 text-xs bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded font-medium transition"
                >
                  {t.autoCalibrate}
                </button>
                <button 
                  onClick={resetCalibration}
                  className="flex-1 text-xs bg-gray-600 hover:bg-gray-700 px-3 py-1.5 rounded font-medium transition"
                >
                  {t.resetCalibration}
                </button>
              </div>
            </div>
          </div>

          {mode === 'training' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showHints} onChange={(e) => setShowHints(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">{t.showHints}</span>
            </label>
          )}
          
          {mode === 'exam' && examStarted && markedDefects.length > 0 && (
            <div className="bg-gray-800 rounded p-3 border border-gray-700">
              <p className="text-sm font-semibold mb-2">{t.defectMarked}:</p>
              <div className="space-y-1 text-xs">
                {markedDefects.map((mark, idx) => (
                  <div key={idx} className={`p-2 rounded flex items-center justify-between ${mark.matchedDefect ? (mark.isCorrectType ? 'bg-green-900' : 'bg-yellow-900') : 'bg-red-900'}`}>
                    <div>
                      <span className="font-bold">#{idx + 1}</span> - {t[mark.identifiedType]}
                      {mark.matchedDefect && (
                        <span className="ml-2 text-xs">
                          {mark.isCorrectType ? `✓ ${t.correctType}` : `✗ ${t.wrongType}`}
                        </span>
                      )}
                    </div>
                    {!score && (
                      <button 
                        onClick={() => deleteMarkedDefect(idx)}
                        className="p-1 hover:bg-red-700 rounded transition"
                        title={t.deleteSelection}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col bg-black relative min-h-0 overflow-hidden">
          <div 
            className="flex-1 relative min-h-0 overflow-hidden"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full object-contain" />
            <canvas 
              ref={overlayCanvasRef} 
              width={800} 
              height={600} 
              className="absolute inset-0 w-full h-full object-contain cursor-crosshair" 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
              onContextMenu={handleContextMenu}
            />
          </div>
          
          {/* Zoom indicator */}
          {zoom !== 1 && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
              Zoom: {(zoom * 100).toFixed(0)}%
            </div>
          )}
          
          {/* Teaching mode status */}
          {mode === 'teaching' && (
            <div className="bg-purple-900 border-t border-purple-700 px-4 py-2">
              <p className="text-sm text-purple-200">
                <span className="font-semibold">Modalità Insegnamento</span> — Difetti e IQI evidenziati, parametri ottimali applicati
              </p>
              <p className="text-xs text-purple-300/70 mt-1">{t.mouseControlsHint}</p>
            </div>
          )}
          
          {/* Learning mode status */}
          {mode === 'learning' && !examStarted && (
            <div className="bg-blue-900 border-t border-blue-700 px-4 py-2">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">Modalità Apprendimento</span> — Imposta kV/mA e premi Inizia per esercitarti
              </p>
              <p className="text-xs text-blue-300/70 mt-1">{t.mouseControlsHint}</p>
            </div>
          )}
          
          {mode === 'learning' && examStarted && (
            <div className="bg-blue-900 border-t border-blue-700 px-4 py-2">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">{t.drawingHint}</span> — Selezionati: {markedDefects.length} (feedback immediato)
              </p>
              <p className="text-xs text-blue-300/70 mt-1">{t.mouseControlsHint}</p>
            </div>
          )}
          
          {/* Exam mode status */}
          {mode === 'exam' && !examStarted && (
            <div className="bg-green-900 border-t border-green-700 px-4 py-2">
              <p className="text-sm text-green-200">
                <span className="font-semibold">Modalità Esame</span> — Imposta tutti i parametri e premi Inizia
              </p>
              <p className="text-xs text-green-300/70 mt-1">{t.mouseControlsHint}</p>
            </div>
          )}
          
          {mode === 'exam' && examStarted && !score && (
            <div className="bg-green-900 border-t border-green-700 px-4 py-2">
              <p className="text-sm text-green-200">
                <span className="font-semibold">{t.drawingHint}</span> — {t.dragToMark} {markedDefects.length}
              </p>
              <p className="text-xs text-green-300/70 mt-1">{t.mouseControlsHint}</p>
            </div>
          )}
          
          {mode === 'exam' && score && (
            <div className="bg-gradient-to-r from-green-900 to-blue-900 border-t border-green-700 px-4 py-3">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-300">{t.detected}: <span className="font-bold text-white">{score.detected}/{score.total}</span></p>
                  <p className="text-sm text-gray-300">Tipo corretto: <span className="font-bold text-white">{score.correctType}/{score.detected + score.falsePositives}</span></p>
                  <p className="text-sm text-gray-300">{t.falsePositives}: <span className="font-bold text-white">{score.falsePositives}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">{score.score}%</p>
                  <p className="text-sm text-gray-300">{parseFloat(score.score) >= 80 ? t.passed : t.failed}</p>
                  <p className="text-xs text-gray-400 mt-1">Classificazione: {score.classificationAccuracy}%</p>
                </div>
                {parseFloat(score.score) >= 80 && (
                  user.isSingleSession ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded text-gray-300 text-sm">
                      <Award className="w-4 h-4" />
                      {t.certificateSubscriptionOnly || 'Certificato disponibile solo con abbonamento'}
                    </div>
                  ) : (
                    <button onClick={() => generateCertificate(user, score)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">
                      <Download className="w-4 h-4" />
                      {t.download}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Subscription Promo Modal - shown after exam in single session */}
      {showPromoModal && (
        <SubscriptionPromoModal
          examCount={sessionExamCount}
          maxExams={MAX_EXAMS_SINGLE_SESSION}
          onDismiss={() => setShowPromoModal(false)}
        />
      )}
    </div>
  );
};

// Exam Review Modal
const ExamReviewModal = ({ exam, onClose, t }) => {
  if (!exam || !exam.reviewData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md">
          <p className="text-gray-300 mb-4">{t.reviewExamTitle}: Dati di revisione non disponibili per questo esame.</p>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            {t.closeReview}
          </button>
        </div>
      </div>
    );
  }
  
  const { defects, markedDefects } = exam.reviewData;
  
  // Calculate statistics
  const missedDefects = defects.filter(d => !d.detected);
  const correctMarks = markedDefects.filter(md => md.isCorrectPosition && md.isCorrectType);
  const wrongTypeMarks = markedDefects.filter(md => md.isCorrectPosition && !md.isCorrectType);
  const falsePositiveMarks = markedDefects.filter(md => !md.isCorrectPosition);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-600 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{t.reviewExamTitle}</h2>
            <p className="text-sm text-gray-400">
              {exam.material} • {exam.thickness}mm • {exam.kV}kV • {new Date(exam.date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{exam.score}%</p>
            <p className={`text-sm ${parseFloat(exam.score) >= 80 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(exam.score) >= 80 ? t.passed : t.failed}
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Visual Map */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Mappa Visuale</h3>
            <div className="relative bg-gray-900 rounded-lg border border-gray-700" style={{ paddingBottom: '75%' }}>
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.2"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Actual defects */}
                {defects.map((defect, idx) => (
                  <g key={`defect-${idx}`}>
                    <circle 
                      cx={defect.x * 100} 
                      cy={defect.y * 100} 
                      r={Math.max(2, (defect.size || 0.02) * 100)}
                      fill={defect.detected ? "#22c55e" : "#ef4444"}
                      fillOpacity="0.3"
                      stroke={defect.detected ? "#22c55e" : "#ef4444"}
                      strokeWidth="0.5"
                    />
                    <text 
                      x={defect.x * 100} 
                      y={defect.y * 100 - 3} 
                      textAnchor="middle" 
                      fill={defect.detected ? "#86efac" : "#fca5a5"}
                      fontSize="2.5"
                    >
                      {t[defect.type] || defect.type}
                    </text>
                  </g>
                ))}
                
                {/* User selections */}
                {markedDefects.map((mark, idx) => (
                  <rect 
                    key={`mark-${idx}`}
                    x={(mark.x - mark.width/2) * 100} 
                    y={(mark.y - mark.height/2) * 100} 
                    width={mark.width * 100}
                    height={mark.height * 100}
                    fill="none"
                    stroke={mark.isCorrectPosition ? (mark.isCorrectType ? "#22c55e" : "#eab308") : "#ef4444"}
                    strokeWidth="0.5"
                    strokeDasharray={mark.isCorrectPosition ? "none" : "2,1"}
                  />
                ))}
              </svg>
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> {t.correct}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Tipo errato</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> {t.missed} / Falso positivo</span>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{correctMarks.length}</p>
              <p className="text-sm text-green-300">{t.correct}</p>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{wrongTypeMarks.length}</p>
              <p className="text-sm text-yellow-300">Tipo Errato</p>
            </div>
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-400">{missedDefects.length}</p>
              <p className="text-sm text-red-300">{t.missed}</p>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-400">{falsePositiveMarks.length}</p>
              <p className="text-sm text-purple-300">{t.falsePositives}</p>
            </div>
          </div>
          
          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Actual Defects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.actualDefects} ({defects.length})</h3>
              <div className="space-y-2 max-h-48 overflow-auto">
                {defects.map((defect, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${defect.detected ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{t[defect.type] || defect.type}</span>
                      <span className={`text-xs px-2 py-1 rounded ${defect.detected ? 'bg-green-700 text-green-200' : 'bg-red-700 text-red-200'}`}>
                        {defect.detected ? '✓ Trovato' : '✗ Mancato'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Posizione: ({(defect.x * 100).toFixed(0)}%, {(defect.y * 100).toFixed(0)}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Your Selections */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.yourSelections} ({markedDefects.length})</h3>
              <div className="space-y-2 max-h-48 overflow-auto">
                {markedDefects.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">Nessuna selezione effettuata</p>
                ) : (
                  markedDefects.map((mark, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${
                      mark.isCorrectPosition && mark.isCorrectType ? 'bg-green-900/20 border-green-700' :
                      mark.isCorrectPosition ? 'bg-yellow-900/20 border-yellow-700' :
                      'bg-red-900/20 border-red-700'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{t[mark.type] || mark.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          mark.isCorrectPosition && mark.isCorrectType ? 'bg-green-700 text-green-200' :
                          mark.isCorrectPosition ? 'bg-yellow-700 text-yellow-200' :
                          'bg-red-700 text-red-200'
                        }`}>
                          {mark.isCorrectPosition && mark.isCorrectType ? '✓ Corretto' :
                           mark.isCorrectPosition ? `Tipo errato (era: ${t[mark.actualType] || mark.actualType})` :
                           '✗ Falso positivo'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
          <button 
            onClick={onClose} 
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            {t.closeReview}
          </button>
        </div>
      </div>
    </div>
  );
};

// Student Dashboard
const StudentDashboard = ({ refreshTrigger }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [reviewingExam, setReviewingExam] = useState(null);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    loadExamHistory();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  const loadExamHistory = async () => {
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const users = JSON.parse(usersResult.value);
        const currentUser = users.find(u => u.id === user.id);
        if (currentUser && currentUser.exams) {
          setExamHistory(currentUser.exams);
        }
      }
    } catch (err) {
      console.error('Load history error:', err);
    }
  };

  const avgScore = examHistory.length > 0 
    ? (examHistory.reduce((sum, e) => sum + parseFloat(e.score), 0) / examHistory.length).toFixed(1)
    : 0;

  const generateCertificate = async (exam) => {
    const certText = `
═══════════════════════════════════════════════════════
          CERTIFICATO DI COMPLETAMENTO
           Programma Training RT NAS 410
═══════════════════════════════════════════════════════

Si certifica che

              ${user.username}
              
ha completato con successo l'esame di Radiografia
Digitale (RT) Non-Distruttiva secondo lo standard
NAS 410.

Data Esame: ${new Date(exam.date).toLocaleDateString()}
Punteggio Finale: ${exam.score}%

Materiale Testato: ${exam.material}
Spessore: ${exam.thickness}mm
Parametri: ${exam.kV}kV, ${exam.mA}mA

Difetti identificati: ${exam.detected}/${exam.total}
Precisione classificazione: ${exam.classificationAccuracy}%

Questo certificato dimostra competenza in:
• Interpretazione immagini radiografiche digitali
• Riconoscimento e classificazione difetti
• Valutazione qualità IQI
• Procedure conformi NAS 410

Autorizzato da: Sistema Training RT
ID Certificato: ${user.id}-${exam.date}

═══════════════════════════════════════════════════════
        Valido solo per scopi formativi
     Non valido per certificazione ufficiale
═══════════════════════════════════════════════════════
  `;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificato_RT_${user.username}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">{t.dashboard}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <p className="text-blue-300 text-sm">{t.totalExams}</p>
          <p className="text-3xl font-bold text-white mt-2">{examHistory.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <p className="text-green-300 text-sm">{t.avgScore}</p>
          <p className="text-3xl font-bold text-white mt-2">{avgScore}%</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <p className="text-purple-300 text-sm">{t.passed}</p>
          <p className="text-3xl font-bold text-white mt-2">{examHistory.filter(e => parseFloat(e.score) >= 80).length}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">{t.examHistory}</h3>
        <div className="space-y-2">
          {examHistory.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nessun esame ancora</p>
          ) : (
            examHistory.slice().reverse().map((exam, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-white font-semibold">Esame #{examHistory.length - idx}</p>
                  <p className="text-sm text-gray-400">{new Date(exam.date).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{exam.material} • {exam.thickness}mm • {exam.kV}kV</p>
                  {exam.classificationAccuracy && (
                    <p className="text-xs text-gray-500">Classificazione: {exam.classificationAccuracy}%</p>
                  )}
                  {exam.trainingTimeFormatted && (
                    <p className="text-xs text-cyan-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.trainingTime}: {exam.trainingTimeFormatted}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{exam.score}%</p>
                  <p className={`text-sm ${parseFloat(exam.score) >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(exam.score) >= 80 ? t.passed : t.failed}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setReviewingExam(exam)} 
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center gap-1"
                    title={t.reviewExam}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.reviewExam}</span>
                  </button>
                  {parseFloat(exam.score) >= 80 && (
                    user.isSingleSession ? (
                      <div className="px-3 py-1 bg-gray-600 rounded text-sm flex items-center gap-1 text-gray-300" title={t.certificateSubscriptionOnly}>
                        <Award className="w-4 h-4" />
                      </div>
                    ) : (
                      <button onClick={() => generateCertificate(exam)} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Exam Review Modal */}
      {reviewingExam && (
        <ExamReviewModal 
          exam={reviewingExam} 
          onClose={() => setReviewingExam(null)} 
          t={t} 
        />
      )}
    </div>
  );
};

// Main App
const AppContent = () => {
  const [view, setView] = useState('simulator');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const [dashboardRefresh, setDashboardRefresh] = useState(0); // Trigger dashboard reload
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [upsellMinutes, setUpsellMinutes] = useState(15);
  const { user, logout, isSessionActive, expireSingleSession, clearSingleSession, purchaseSingleSession, singleSession, getSessionRemainingTime, startFreeDemo } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  
  // Check for session expiration periodically
  useEffect(() => {
    if (!user?.isSingleSession || !singleSession) return;
    
    const checkExpiration = setInterval(() => {
      const remaining = getSessionRemainingTime();
      if (remaining !== null && remaining <= 0 && !showExpiredModal) {
        expireSingleSession();
        setShowExpiredModal(true);
      }
    }, 1000);
    
    return () => clearInterval(checkExpiration);
  }, [user, singleSession, showExpiredModal]);
  
  const openFeedback = (type) => {
    setFeedbackType(type);
    setFeedbackOpen(false);
  };
  
  // Handle exam completion - just refresh dashboard data, stay on simulator to show results
  const handleExamComplete = () => {
    setDashboardRefresh(prev => prev + 1); // Trigger reload when user visits dashboard
    // Don't navigate away - let user see the exam results first!
  };

  // Handle session timer warnings
  const handleSessionWarning = (minutes) => {
    setUpsellMinutes(minutes);
    // Don't show upsell modal for free demo (15 min), only for full sessions
    if (minutes === 15 && !singleSession?.isDemo) {
      setShowUpsellModal(true);
    }
  };

  // Handle session expiration
  const handleSessionExpire = async () => {
    await expireSingleSession();
    setShowExpiredModal(true);
  };

  // Handle buying another session
  const handleBuyAnother = async () => {
    await clearSingleSession();
    setShowExpiredModal(false);
    await logout();
  };

  // Handle upgrade to standard
  const handleUpgrade = () => {
    setShowExpiredModal(false);
    setShowUpsellModal(false);
    // In production, this would redirect to Stripe checkout
    alert('In produzione, questo porterebbe al checkout Stripe per il piano Standard con 20% di sconto!');
  };

  // Track total time in app for each user
  useEffect(() => {
    if (!user || user.isSingleSession) return; // Don't track for demo/single sessions
    
    const trackTime = async () => {
      try {
        const usersResult = await storage.get('users_db');
        if (usersResult) {
          const users = JSON.parse(usersResult.value);
          const userIndex = users.findIndex(u => u.id === user.id);
          if (userIndex !== -1) {
            // Add 60 seconds to total app time
            users[userIndex].totalAppTimeSeconds = (users[userIndex].totalAppTimeSeconds || 0) + 60;
            await storage.set('users_db', JSON.stringify(users));
          }
        }
      } catch (err) {
        console.log('Time tracking error:', err);
      }
    };
    
    // Track time every minute
    const interval = setInterval(trackTime, 60000);
    
    // Also track immediately on mount
    trackTime();
    
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="h-screen bg-gray-950 text-white flex overflow-hidden">
      {/* Single Session Timer */}
      {user?.isSingleSession && isSessionActive() && (
        <SingleSessionTimer 
          onExpire={handleSessionExpire}
          onWarning={handleSessionWarning}
        />
      )}

      {/* Upsell Modal */}
      {showUpsellModal && (
        <SingleSessionUpsellModal 
          remainingMinutes={upsellMinutes}
          onUpgrade={handleUpgrade}
          onDismiss={() => setShowUpsellModal(false)}
        />
      )}

      {/* Expired Modal */}
      {showExpiredModal && (
        <SingleSessionExpiredModal 
          onBuyAnother={handleBuyAnother}
          onUpgrade={handleUpgrade}
          onStartDemo={async () => {
            setShowExpiredModal(false);
            await clearSingleSession();
            await startFreeDemo();
          }}
          onClose={async () => {
            setShowExpiredModal(false);
            await clearSingleSession();
            await logout();
          }}
        />
      )}

      {feedbackType && (
        <FeedbackModal 
          type={feedbackType} 
          onClose={() => setFeedbackType(null)} 
          t={t} 
        />
      )}
      
      {changelogOpen && (
        <ChangelogModal 
          onClose={() => setChangelogOpen(false)} 
          t={t} 
        />
      )}
      
      {showTosModal && (
        <TermsOfServiceModal onClose={() => setShowTosModal(false)} />
      )}
      
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <img src={COMPANY_LOGO} alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold">RT Training</h1>
              <p className="text-xs text-gray-400">NAS 410</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded">
            <p className="text-sm font-semibold text-white">{user.username}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                user.role === 'admin' ? 'bg-red-900 text-red-200' :
                user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
                user.isSingleSession ? 'bg-yellow-900 text-yellow-200' :
                'bg-green-900 text-green-200'
              }`}>
                {user.isSingleSession ? t.singleSession : t[user.role]}
              </span>
              {user.isSingleSession && (
                <Zap className="w-4 h-4 text-yellow-400" />
              )}
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {/* Trainer: Students Overview */}
          {user.role === 'trainer' && (
            <button onClick={() => setView('students')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'students' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
              <Users className="w-5 h-5" />
              <span>{t.students}</span>
            </button>
          )}
          
          {/* Student & Trainer: Personal Dashboard */}
          {(user.role === 'student' || user.role === 'trainer') && (
            <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
              <BarChart3 className="w-5 h-5" />
              <span>{t.dashboard}</span>
            </button>
          )}

          <button onClick={() => setView('simulator')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'simulator' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Camera className="w-5 h-5" />
            <span>{t.simulator}</span>
          </button>

          <button onClick={() => setView('certificates')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'certificates' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Award className="w-5 h-5" />
            <span>{t.certificates}</span>
          </button>
          
          {/* Admin: Hidden access, only visible to admin users */}
          {user.role === 'admin' && (
            <button onClick={() => setView('admin')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'admin' ? 'bg-red-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
              <Settings className="w-5 h-5" />
              <span>{t.admin}</span>
            </button>
          )}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-700">
          <button onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 text-gray-300 mb-2">
            <Globe className="w-5 h-5" />
            <span>{language === 'en' ? 'Italiano' : 'English'}</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-900 hover:bg-red-800 text-red-200">
            <LogOut className="w-5 h-5" />
            <span>{t.logout}</span>
          </button>
          <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-800/30 rounded">
            <p className="text-xs text-yellow-500 font-medium text-center">{t.certificateDisclaimer1}</p>
            <p className="text-xs text-yellow-700 text-center">{t.certificateDisclaimer2}</p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">{COPYRIGHT_TEXT}</p>
          <button 
            onClick={() => setShowTosModal(true)}
            className="text-xs text-cyan-500 hover:text-cyan-400 underline block mx-auto mt-1"
          >
            {t.termsOfService || 'Termini di Servizio'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-semibold">
            {view === 'simulator' && t.simulator}
            {view === 'dashboard' && t.dashboard}
            {view === 'students' && t.studentsOverview}
            {view === 'admin' && `${t.admin} ${t.dashboard}`}
            {view === 'certificates' && t.certificates}
          </h2>
          
          {/* Feedback Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setFeedbackOpen(!feedbackOpen)} 
              className="p-2 hover:bg-gray-800 rounded flex items-center gap-1 text-gray-400 hover:text-white transition"
            >
              <MessageSquare className="w-5 h-5" />
              <ChevronDown className="w-3 h-3" />
            </button>
            
            {feedbackOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setFeedbackOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 w-56 overflow-hidden">
                  <div className="px-3 py-2 border-b border-gray-700">
                    <p className="text-sm font-semibold text-white">{t.feedback}</p>
                  </div>
                  <button 
                    onClick={() => openFeedback('problem')}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition text-left"
                  >
                    <Bug className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-200">{t.reportProblem}</span>
                  </button>
                  <button 
                    onClick={() => openFeedback('feature')}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition text-left"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-200">{t.requestFeature}</span>
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button 
                    onClick={() => { setChangelogOpen(true); setFeedbackOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition text-left"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-200">{t.changelog}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {view === 'simulator' && <XRaySimulator onExamComplete={handleExamComplete} />}
          {view === 'dashboard' && <StudentDashboard refreshTrigger={dashboardRefresh} />}
          {view === 'students' && user.role === 'trainer' && <TrainerDashboard />}
          {view === 'admin' && user.role === 'admin' && <AdminDashboard />}
          {view === 'certificates' && <CertificatesView />}
        </div>
      </div>
    </div>
  );
};

const Root = () => {
  const { user, loading } = useAuth();
  const [language, setLanguage] = useState('it');
  const t = translations[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-center">
          <img src={COMPANY_LOGO} alt="Logo" className="w-20 h-20 mx-auto mb-4 animate-pulse" />
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {user ? <AppContent /> : <LoginScreen />}
    </LanguageContext.Provider>
  );
};

export default () => (
  <AuthProvider>
    <Root />
  </AuthProvider>
);
