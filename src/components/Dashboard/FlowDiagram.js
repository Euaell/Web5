// Import React Flow and React hooks
import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import { useIdleTimer } from 'react-idle-timer'

// Define some sample data for the sensors and the flow rate
const sensorData = [
  { id: 's1', type: 'input', data: { label: 'Sensor 1' }, position: { x: 250, y: 25 } },
  { id: 's2', type: 'default', data: { label: 'Sensor 2' }, position: { x: 100, y: 125 } },
  { id: 's3', type: 'default', data: { label: 'Sensor 3' }, position: { x: 400, y: 125 } },
];

const flowRateData = [
  { id:'f1', source:'s1', target:'s2', animated:true, label:'10 L/min' },
  { id:'f2', source:'s1', target:'s3', animated:true, label:'15 L/min' },
];

// Define a custom edge component to show the flow rate
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition,
targetPosition,label }) => {

  // Calculate the path for the edge
  const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;

  // Return a SVG element with a path and a text
  return (
    <g>
      <path id={id} className="react-flow__edge-path" d={edgePath} />
      <text>
        <textPath href={`#${id}`} style={{ fontSize:"12px" }} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
    </g>
   );
};

// Define a custom node component to show the sensor status
const CustomNode = ({ data }) => {

   // Use a state variable to store the sensor status (active or deactive)
   const [status, setStatus] = useState('active');

   // Use a hook to check user activity and update the status accordingly
   useIdleTimer({
     timeout :10000,
     onIdle :() => setStatus('deactive'),
     onActive :() => setStatus('active'),
   });

   // Return a div element with a button and a label
   return (
     <div className={`sensor-node ${status}`}>
       <button onClick={() => setStatus(status === 'active' ? 'deactive' : 'active')}>
         Toggle Status
       </button>
       <div>{data.label}</div>
     </div>
   );
};

// Define the elements array by combining the sensor data and the flow rate data
const elements = [...sensorData,...flowRateData];

// Define the node types object by mapping the custom node component
const nodeTypes = {
 input :CustomNode,
 default :CustomNode,
};

// Define the edge types object by mapping the custom edge component
const edgeTypes = {
 default :CustomEdge,
};

// Define the App component that renders the React Flow component with the elements,
// node types and edge types props

function App() {
 return (
   <div className="App">
     <ReactFlow elements={elements} nodeTypes={nodeTypes} edgeTypes={edgeTypes}/>
   </div>
 );
}

export default App;