import React, { useState } from "react";

function TodoList() {
  // 과제 4: 입력값과 리스트를 상태로 관리 (기존 input의 value와 ul 내부 내용은 상태로 대체)
  const [todo, setTodo] = useState("");        // input의 현재 값
  const [todos, setTodos] = useState([]);      // 할 일 목록 배열

  // 과제 4: '추가' 버튼 클릭 시 실행되던 jQuery 코드 -> handleAdd 함수로 구현
  const handleAdd = () => {
    const trimmed = todo.trim();
    if (trimmed === "") {
      alert("공백은 추가할 수 없습니다.");
      return;
    }

    // 기존: $("#todoList").append(...) → React에서는 상태 배열을 업데이트
    setTodos([...todos, trimmed]);

    // 기존: $("#todoInput").val("") → 상태 초기화로 처리
    setTodo("");
  };

  // 과제 6: 삭제 버튼 클릭 시 → 부모 <li>를 remove() 하던 코드
  const handleDelete = (indexToRemove) => {
    // 기존: $(this).parent().remove() → filter로 index 제외한 새 배열 생성
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h3>과제 4 & 6: 할 일 리스트</h3>

      {/* 기존 HTML: <input id="todoInput" /> → value와 onChange 속성을 가진 controlled input */}
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
      />

      {/* 기존 HTML: <button id="addBtn"> → onClick 이벤트 직접 지정 */}
      <button onClick={handleAdd}>추가</button>

      {/* 기존 HTML: <ul id="todoList"> 내부에 동적으로 <li> 추가 → React에서는 map()으로 렌더링 */}
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item}
            {/* 기존 HTML: <button class="delBtn">x</button> → 이벤트 핸들러 함수에 index 전달 */}
            <button onClick={() => handleDelete(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;