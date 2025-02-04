const $siteList = $('.siteList')//此处只接受类名，必须以字符串形式传入//变量可以不加''
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo:'A', url:'https://www.acfun.cn' },
    {logo: 'B', url: 'https://bilibili.com'
    }
];
const simplifyUrl = (url)=>{
    return url.replace('https://', '')
    .replace('http://','')
    .replace('www.', '')
    .replace(/\/.*/, '') //删除/开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)//变量不加引号
        $li.on('click', ()=>{
            window.open(node.url)
        }) //代替a标签作用,否则无法单纯click close
        $li.on('click','.close', (e)=>{
            e.stopPropagation() //阻止冒泡，li
            hashMap.splice(index, 1)
            render()
        })
    })
}    

render()

$('.addButton')
 .on('click',()=>{
    let url = window.prompt("请问你要添加的网址是啥？")
    if(url===null || url.trim()===''){
        console.log('用户取消输入或内容为空')
        return
    }else if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
    });
    
    render()
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress', (e)=>{
    const {key} = e //const key = e.key
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})