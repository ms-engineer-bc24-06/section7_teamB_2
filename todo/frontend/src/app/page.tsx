"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskBoard from '../components/TaskBoard';
import { Task } from '../types/task';
import './styles.css';
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";
import "./styles.css";

// 開発環境のみconsole.logを出力する設定。.envも要参照。
const isDebugMode = process.env.NODE_ENV !== 'production';

// ログを仕込みたい箇所には以下を記述
// if (isDebugMode) {
//   console.log('logging message');
// }

type Task = {
  task_id: number;
  user_name: string;
  task_name: string;
  category: string;
  status: string;
  deadline: string;
  memo: string;
};

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/lib/api/logout"); // バックエンドのログアウトAPIを呼び出す
      router.push("/login"); // ログアウト後にログインページにリダイレクト
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };
  //componentがmountされたときにDBからタスクを読み込む
  useEffect(() => {
    fetch("http://localhost:8000/task")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  //新しいタスクを追加する関数
  // const addTask = (newTask: Omit<Task, "task_id">) => {
  //   fetch("http://localhost:8000/task", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newTask),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setTasks((prevTasks) => [...prevTasks, data]));
  // };

  //タスクのステータスを更新する関数
  const moveTask = (id: number, newStatus: string) => {
    // log
    if (isDebugMode) {
      console.log(`タスクのステータスを更新しています: タスクID: ${id}, 新しいステータス: ${newStatus}`);
    }

    fetch(`http://localhost:8000/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
    .then(response => {
      // log
      if (isDebugMode) {
        console.log('ステータス更新後のレスポンスを受信しました:', response);
      }
      // 処理結果
      return response.json();
    })
    .then(updatedTask => {
      // log
      if (isDebugMode) {
        console.log('更新されたタスク:', updatedTask);
      }
      // 処理結果
      setTasks(prevTasks => prevTasks.map(task => task.task_id === id ? updatedTask : task));
    })
    .catch(error => {
      // log
      if (isDebugMode) {
        console.error('タスクのステータス更新中にエラーが発生しました:', error);
      }
    });
  };

  // タスクの詳細画面に遷移する関数
  const viewTaskDetail = (id: number) => {
    if (isDebugMode) {
      console.log(`タスクの詳細画面に遷移します: タスクID: ${id}`);
    }
    router.push(`/task/${id}`);
  };

  //タスクを削除する関数
  const deleteTask = (id: number) => {
    // log
    if (isDebugMode) {
      console.log(`タスクを削除しています: タスクID: ${id}`);
    }

    fetch(`http://localhost:8000/task/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // log
      if (isDebugMode) {
        console.log(`タスクが削除されました: タスクID: ${id}`);
      }
      // 処理
      setTasks(prevTasks => prevTasks.filter(task => task.task_id !== id));
    })
    .catch(error => {
      // log
      if (isDebugMode) {
        console.error('タスクの削除中にエラーが発生しました:', error);
      }
    });
  };

  return (
    <div>
      <h1>TeamB: タスク管理dayone</h1>
      <button onClick={() => router.push('/add-task')}>Add Task</button>
      <TaskBoard tasks={tasks} onMove={moveTask} onDelete={deleteTask} onViewDetail={viewTaskDetail} />
      <LogoutButton />
    </div>
  );
};

export default HomePage;