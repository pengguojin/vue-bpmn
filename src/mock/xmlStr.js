export var xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">
  <process id="leaveTest" name="请假流程" isExecutable="true">
    <documentation>请假流程测试</documentation>
    <startEvent id="startEvent1" flowable:formFieldValidation="true" />
    <parallelGateway id="sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923" />
    <userTask id="userTask3" name="财务审批" flowable:formFieldValidation="true" flowable:assignee="小红">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <userTask id="userTask1" name="部门经理审批" flowable:formFieldValidation="true" flowable:assignee="张三">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <userTask id="userTask2" name="总经理审批" flowable:formFieldValidation="true" flowable:assignee="李四">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-C61E0139-53C9-4FB9-9F2E-1B0E8EAFB9CE" sourceRef="userTask1" targetRef="userTask2" />
    <userTask id="userTask4" name="人事审批" flowable:formFieldValidation="true" flowable:assignee="小明">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-15BAE39E-1FB1-4536-A0BC-3E095319A0D4" sourceRef="userTask3" targetRef="userTask4" />
    <parallelGateway id="sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6" />
    <endEvent id="sid-61CD7CAA-CE52-46F3-B2F0-2F20242B3EAE" />
    <sequenceFlow id="sid-7D8F38D6-567C-4BE3-B7D7-A163A7AFBEBB" sourceRef="userTask4" targetRef="sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6" />
    <sequenceFlow id="sid-F302FC41-F766-4099-8258-F572DE8EC1A4" sourceRef="userTask2" targetRef="sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6" />
    <userTask id="userTask0" name="组长审批" flowable:formFieldValidation="true" flowable:assignee="group@01">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-CA0227B0-CEC3-42E1-BAC2-120BE5B35506" sourceRef="startEvent1" targetRef="userTask0" />
    <sequenceFlow id="sid-89DB585F-10DC-4445-AAED-950D6312B77D" sourceRef="userTask0" targetRef="sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923" />
    <sequenceFlow id="sid-4086AFDE-105D-4880-B352-9317C0C15048" sourceRef="sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923" targetRef="userTask1" />
    <sequenceFlow id="sid-A0414369-AD3A-4B75-AD08-F0D97DBFED14" sourceRef="sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923" targetRef="userTask3" />
    <userTask id="userTask5" name="老板审批" flowable:formFieldValidation="true" flowable:assignee="boss">
      <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler">false</modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-3E20FD51-B9DC-4BBC-A91C-59922695DC98" sourceRef="sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6" targetRef="userTask5" />
    <sequenceFlow id="sid-1BDC8C68-B3D9-4018-A0D4-344058622194" sourceRef="userTask5" targetRef="sid-61CD7CAA-CE52-46F3-B2F0-2F20242B3EAE" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_parallel">
    <bpmndi:BPMNPlane id="BPMNPlane_parallel" bpmnElement="leaveTest">
      <bpmndi:BPMNEdge id="BPMNEdge_sid-1BDC8C68-B3D9-4018-A0D4-344058622194" bpmnElement="sid-1BDC8C68-B3D9-4018-A0D4-344058622194">
        <omgdi:waypoint x="914" y="166" />
        <omgdi:waypoint x="990" y="166" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-3E20FD51-B9DC-4BBC-A91C-59922695DC98" bpmnElement="sid-3E20FD51-B9DC-4BBC-A91C-59922695DC98">
        <omgdi:waypoint x="789" y="166" />
        <omgdi:waypoint x="866" y="166" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-A0414369-AD3A-4B75-AD08-F0D97DBFED14" bpmnElement="sid-A0414369-AD3A-4B75-AD08-F0D97DBFED14">
        <omgdi:waypoint x="305" y="185" />
        <omgdi:waypoint x="305" y="220" />
        <omgdi:waypoint x="386" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-4086AFDE-105D-4880-B352-9317C0C15048" bpmnElement="sid-4086AFDE-105D-4880-B352-9317C0C15048">
        <omgdi:waypoint x="305" y="145" />
        <omgdi:waypoint x="305" y="90" />
        <omgdi:waypoint x="396" y="90" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-89DB585F-10DC-4445-AAED-950D6312B77D" bpmnElement="sid-89DB585F-10DC-4445-AAED-950D6312B77D">
        <omgdi:waypoint x="234" y="165" />
        <omgdi:waypoint x="285" y="165" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-CA0227B0-CEC3-42E1-BAC2-120BE5B35506" bpmnElement="sid-CA0227B0-CEC3-42E1-BAC2-120BE5B35506">
        <omgdi:waypoint x="100" y="165" />
        <omgdi:waypoint x="186" y="165" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-F302FC41-F766-4099-8258-F572DE8EC1A4" bpmnElement="sid-F302FC41-F766-4099-8258-F572DE8EC1A4">
        <omgdi:waypoint x="614" y="90" />
        <omgdi:waypoint x="770" y="90" />
        <omgdi:waypoint x="770" y="145" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-7D8F38D6-567C-4BE3-B7D7-A163A7AFBEBB" bpmnElement="sid-7D8F38D6-567C-4BE3-B7D7-A163A7AFBEBB">
        <omgdi:waypoint x="604" y="220" />
        <omgdi:waypoint x="770" y="220" />
        <omgdi:waypoint x="770" y="185" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-15BAE39E-1FB1-4536-A0BC-3E095319A0D4" bpmnElement="sid-15BAE39E-1FB1-4536-A0BC-3E095319A0D4">
        <omgdi:waypoint x="434" y="220" />
        <omgdi:waypoint x="556" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-C61E0139-53C9-4FB9-9F2E-1B0E8EAFB9CE" bpmnElement="sid-C61E0139-53C9-4FB9-9F2E-1B0E8EAFB9CE">
        <omgdi:waypoint x="444" y="90" />
        <omgdi:waypoint x="566" y="90" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="BPMNShape_startEvent1" bpmnElement="startEvent1">
        <omgdc:Bounds x="60" y="145" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923" bpmnElement="sid-D6AC16D7-1F6A-4F8D-8CBB-A084DB864923">
        <omgdc:Bounds x="285" y="145" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask3" bpmnElement="userTask3">
        <omgdc:Bounds x="386" y="196" width="48" height="48" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask1" bpmnElement="userTask1">
        <omgdc:Bounds x="396" y="66" width="48" height="48" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask2" bpmnElement="userTask2">
        <omgdc:Bounds x="566" y="66" width="48" height="48" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask4" bpmnElement="userTask4">
        <omgdc:Bounds x="556" y="196" width="48" height="48" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6" bpmnElement="sid-D5AE6EB1-5850-47FA-B1E5-D8C70B2025A6">
        <omgdc:Bounds x="750" y="145" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-61CD7CAA-CE52-46F3-B2F0-2F20242B3EAE" bpmnElement="sid-61CD7CAA-CE52-46F3-B2F0-2F20242B3EAE">
        <omgdc:Bounds x="990" y="146" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask0" bpmnElement="userTask0">
        <omgdc:Bounds x="186" y="141" width="48" height="48" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_userTask5" bpmnElement="userTask5">
        <omgdc:Bounds x="866" y="142" width="48" height="48" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
