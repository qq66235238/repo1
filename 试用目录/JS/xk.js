/* 
	Xie Kai's JavaScript Document.
	After Miaowei Classroom learning, completely write their own code library.
*/



/*1---------$()ʹ��  ��ʼ---------*/

function $( v ){
	if( typeof v === 'function' ){	//�������ں���������ҳ��������֮��ִ�д���
		window.onload = v;
	} else if ( typeof v === 'string' ) {	//���������ַ�������ô�Ͳ���id
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {	//�������ڶ��󣬾�ֱ�ӷ��ض���
		return v;
	}
}

/*---------$()ʹ��  ����---------*/



/*2---------getElementsByClassName()ʹ��  ����ҳ����classԪ��  ��ʼ---------*/
/*
	obj == ��Ԫ��,����û�и�Ԫ�أ�����ʹ��document
	tagName ==  ��Ԫ�أ��������������е���Ԫ�أ�����ʹ��'*'
	className == ҳ���е�class
	ʹ�÷�����
	getElementsByClassName(��Ԫ��,��Ԫ��,ҳ���е�class)
*/
function getElementsByClassName(obj,tagName,className){
	var aEls = obj.getElementsByTagName(tagName);	//obj��ʲô�����µ�tagName��ǩ
	var arr =[];									//����һ���յ�����
	for(var i=0;i<aEls.length;i++){					//ѭ���º��������ж���tagName��ǩ
		var aClassName = aEls[i].className.split(' ');//����class��'box box1'�м����пո񣬾Ͳ�����
		for(var j=0;j<aClassName.length;j++){		//Ȼ��ѭ�����ֵ���������
			if(aClassName[j ]==className){			//����������������������Ҫ��
				arr.push( aEls[i] );				//��ô�ͼӵ�arr��������
				break;								//��������ȥ�������Բ��ǵ�������Ԫ��������ͬ��class
			}	
		}
	}
	return arr;										//���󷵻�arr��getElementsByClassName
};
/*---------getElementsByClassName()  ����---------*/



/*3---------addClass(���ӣ�class) removeClass(���ӣ�class)  ��ʼ---------*/
function addClass(obj,className){
			if( obj.className == '' ){			//����ԭ��û��Class
				obj.className = className;		//��ô����ȥ��ֵ�͵���ClassName
			}else{
				//������class
				//�������ӵ�class��ԭ����class�в�����
				var arrClassName = obj.className.split(' ');	//��obj��className�ַ����ָ�������
				var _index = arrIndexof( arrClassName,className );//��������װ��arrIndexOf(arr.v)
				if(_index == -1){								//����û���ҵ�Ҫ���ӵ�Class
					obj.className += ' '+className;				//��ôobj��className��+= �ո�+className
				}
				
				//�������ӵ�class��ԭ����class�д���
			}
		}
		function removeClass(obj,className){
			if(obj.className != ''	){							//����ԭ����Class
				var arrClassName = obj.className.split(' ');	//��ô�Ͱ�ԭ����Class�ָ���������ʽ
				var _index = arrIndexof( arrClassName,className );//��������װ��arrIndexOf(arr.v)
				//����������Ҫ�Ƴ���class
				if(_index != -1){							//����������-1�ͱ�ʾ����Ҫ�Ƴ���
					arrClassName.splice(_index,1);			//��ô�ʹ�_index��λ�ã�ɾ��1λ
					obj.className = arrClassName.join(' ');//����ת�����ַ�����ʽ
				}
			}
			//����ԭ��û��Class
		}

		function arrIndexOf(arr,v){		//arr���ڷָ��������飬v����Ҫ�����е�Class
			for(var i=0;i<arr.length;i++){//��ʼѭ������
				if(arr[i]== v){			//��������ĳ��ֵ����V��Ҳ����Ҫ�����е�Class
					return i;			//��ô���صڼ���λ��Ҳ����i
					
				}
			}
			return -1;		//����û�оͷ���-1
		}
/*---------addClass() removeClass()  ����---------*/



/*4---------getStyle()�����Ӽ�������ʾ����  ��ʼ---------*/

//��ȡ�������ĺ�����ʽ��obj��д���ӣ�attr��д�����߸ߣ�����͸���ȵȵ�
function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}

/*---------getStyle()�����Ӽ�������ʾ����  ����---------*/





/*5---------doMove()�����Զ��ĺ���  ��ʼ---------*/

//obj�Ǻ���  attr��Ҫ�ߵĿ����߸�  dir�ǲ�����target�ǵ�����λ�ã�endfn�ǿ��Լ���ִ�еĺ���
function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// ����
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
		
	}, 30);
}

/*6---------doMove()�����Զ��ĺ���  ����--------*/






/*7---------shake()�����Զ����ĺ���  ��ʼ---------*/

//��������obj�Ǻ��ӣ�attr��top����left��endFn�ǿ���ִ�������ĺ��� shake( this, 'left');
function shake( obj, attr, endFn ){
	var pos = parseInt( getStyle(obj, attr) );
	var arr = [];			// 20, -20, 18, -18 ..... 0
	var num = 0;
	var timer = null;
		
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
	if(obj.onOff !== true ){	//��������������true����ִ�������Ĵ��� ע�������ظ�ʹ�ö�
		clearInterval( obj.shake );
		obj.shake = setInterval(function (){
			obj.onOff = true;	//��ʼִ�е�ʱ����һֱΪtrue������������true�ǹر�
			obj.style[attr] = pos + arr[num] + 'px';
			num++;
			if ( num === arr.length ) {
				clearInterval( obj.shake );
				endFn && endFn();
				obj.onOff = false;	//ִ����֮�󣬾ͱ���flase��Ȼ���ֿ��Կ�ʼ����
			}
		}, 50);
	}
}

/*---------shake()�����Զ����ĺ���  ����---------*/


/*8---------hide()������ obj�Ǻ��ӣ�sec�ǽ���ʱ�䣬endFn�Ǽ���ִ�еĺ���---------*/
function hide(obj,cy,sec,endFn){
	var timer = null;
	var fadeNum = Number(getStyle( obj, 'opacity' )*100);
	var fadeNum1 = Number(getStyle( obj, 'opacity' ));
	
	timer = setInterval(function(){
		fadeNum -= 10;
		fadeNum1 -=0.1;
		obj.style.filter="alpha(opacity="+fadeNum+")";  
		obj.style['-moz-opacity'] =fadeNum1;  
		obj.style['-khtml-opacity']=fadeNum1;  
		obj.style.opacity = fadeNum1;
		if(fadeNum==cy*100 || fadeNum1==cy){
			clearInterval( timer );
			endFn && endFn();
		}
	},sec);
}

/*---------hide()������---------*/



/*9---------out()������ obj�Ǻ��ӣ�sec�ǽ���ʱ�䣬endFn�Ǽ���ִ�еĺ���---------*/
function out(obj,cy,sec,endFn){
	var timer = null;
	var fadeNum = Number(getStyle( obj, 'opacity' )*100);
	var fadeNum1 = Number(getStyle( obj, 'opacity' ));
	timer = setInterval(function(){
		fadeNum += 10;
		fadeNum1 +=0.1;
		obj.style.filter="alpha(opacity="+fadeNum+")";  
		obj.style['-moz-opacity'] =fadeNum1;  
		obj.style['-khtml-opacity']=fadeNum1;  
		obj.style.opacity = fadeNum1;
		if(fadeNum==cy*100 || fadeNum1==cy){
			clearInterval( timer );
			endFn && endFn();
		}
	},sec);
}

/*---------out()������---------*/




/*10---------getPos()����ȡdiv��body�Ŀ����߸ߣ���ʼ---------*/
/*
	ʹ�÷�����
			var p = getPos( oDiv3 );	//p����pos��jsonֵ
			alert( p.top );				//���Ե���ʱ����ֱ�ӵ���p.left����p.top

*/
function getPos(obj) {		//�жϵľ��Ǻ��ӣ�����ѭ����������ʱ�����Ӿ��޷��жϣ�Ҳ��Ϊfalse
		
		var pos = {left:0, top:0};	//ʹ��json���������Ի��õ�left��top����ֵ
		
		while (obj) {
			pos.left += obj.offsetLeft;	//left���õ�ǰԪ�ص�����Ԫ�ص�left����
			pos.top += obj.offsetTop;	//left���õ�ǰԪ�ص�����Ԫ�ص�top�߶�
			obj = obj.offsetParent;		//�ҵ�div���ӵĸ���Ԫ�أ�Ȼ������ѭ��
		}
		
		return pos;			//���ص�ʵ��Ҳ��json
		
	}

/*---------getPos()����ȡdiv��body�Ŀ����߸ߣ�����---------*/


/*---------drag()����ק��objдҪ��ק�����壬���������޸Ĵ�������Ч������ʼ---------*/
function drag(obj){
	obj.onmousedown = function(ev){	//1���Ȱ���
		var ev = ev || event;			//����ev
		var disX = ev.clientX - this.offsetLeft; //��ȡ���굽�����ߵ�ֵ��ȥ���ӵ������ߵ�ֵ���������ھ����������߾�����ֵ
		var disY = ev.clientY - this.offsetTop;//ͬ�ϣ�ֻ���Ǹ߶�

		if( obj.setCapture ){	//ȫ�����񣬽�����ק����
			obj.setCapture();
		}


		document.onmousemove = function(ev){	//2������ʱ�ƶ�
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			if( L<0 ){		//�ر�ע�⣡��������0��Ϊ100�����Գ�Ϊ����������Ч��
				L = 0;
			}else if( L>document.documentElement.clientWidth - obj.offsetWidth ){
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}
			if( T<0 ){
				T=0;
			}else if( T>document.documentElement.clientHeight - obj.offsetHeight ){
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}
			obj.style.left = ev.clientX - disX +'px';
			obj.style.top = ev.clientY - disY +'px';
		}


		document.onmouseup = function(){ //3��̧��
		
			document.onmousemove = null;
			if (  obj.releaseCapture ){ //����ȫ�����񣬽�����ק����
				obj.releaseCapture();
			}
		}

		return false;
	}
}
/*---------drag()������---------*/


/*---------transition���������¼�,addEnd(obj(����),fn(���ӵĺ���)),removeEnd(obj,fn)��ʼ---------*/
/*
	.box{width:100px;height:100px;background:red; transition:1s width;} //�����Ͳ���Ҫbox��hover�ˣ���jsͬ�����Դﵽhover��Ч��
	<div class="box"></div>

	var oBox=document.getElementById("box");
	oBox.onclick=function()						//������������ô�Ϳ�ʼִ��
	{
		this.style.width=this.offsetWidth+100+"px";	//�Ὺʼ���й���
		addEnd(oBox,end);						//Ȼ����������֮�����ټ���ִ������
	};	
	function end()								//���������񣬻Ὺʼ�����ӿ�100px
	{
		this.style.width=this.offsetWidth+100+"px";
		removeEnd(this,end);					//Ȼ��ɾ������������
	}

	//���ݴ���
	function addEnd(obj,fn)		//�������ɺ����¼�
	{
		obj.addEventListener('WebkitTransitionEnd',fn,false);
		obj.addEventListener('transitionend',fn,false);
	}

	function removeEnd(obj,fn)	//ɾ���¼�
	{
		obj.removeEventListener('WebkitTransitionEnd',fn,false);
		obj.removeEventListener('transitionend',fn,false);
	}

*/

//�����Ǽ��ݴ���

function addEnd(obj,fn)		//�������ɺ����¼�
{
    obj.addEventListener('WebkitTransitionEnd',fn,false);
    obj.addEventListener('transitionend',fn,false);
}

function removeEnd(obj,fn)	//ɾ���¼�
{
    obj.removeEventListener('WebkitTransitionEnd',fn,false);
    obj.removeEventListener('transitionend',fn,false);
}

/*---------transition���������¼�����---------*/