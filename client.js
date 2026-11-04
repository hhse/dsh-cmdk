/**
 * dsh-cmdk — client half: the ⌘K palette.
 *
 * One overlay (shell.overlay) plus a small sidebar footer button. Navigation,
 * renaming, archiving, forking and theming all go through public Client
 * services; only the things a browser cannot do (reveal a directory, export a
 * transcript) come from the tiny Host route.
 */
window.__ModuleLoader__.load({
  id: 'dsh-cmdk',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    var react = require('react');
    var h = react.createElement;
    var useEffect = react.useEffect;
    var useRef = react.useRef;
    var useState = react.useState;

    var API = '/cmdk';
    var RECENT_KEY = 'dsh-cmdk/recent';
    var MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

    var C = {
      text: 'var(--dsw-alias-label-primary)',
      sub: 'var(--dsw-alias-label-secondary)',
      line: 'var(--dsw-alias-border-l1)',
      lineStrong: 'var(--dsw-alias-border-l2)',
      layer: 'var(--dsw-alias-bg-layer-1)',
      layerAlt: 'var(--dsw-alias-bg-layer-2)',
      overlay: 'var(--dsw-alias-bg-overlay)',
      base: 'var(--dsw-alias-bg-base)',
      brand: 'var(--dsw-alias-brand-primary)',
      err: 'var(--dsw-alias-state-error-primary)',
      ok: 'var(--dsw-alias-state-success-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
    };

    var STRINGS = {
      zh: {
        placeholder: '搜索会话、工作区，或直接执行…',
        emptyTitle: '没有匹配的结果',
        emptyFor: '没有找到 “{q}”',
        emptySub: '试试会话标题、工作区路径，或直接输入命令',
        results: '项结果',
        resultsLabel: '搜索结果',
        palette: '命令面板',
        clear: '清除',
        hintSelect: '选择',
        hintOpen: '打开',
        hintActions: '更多',
        hintRun: '执行',
        hintBack: '返回',
        hintClose: '关闭',
        searching: '正在搜索…',
        action: '动作',
        session: '会话',
        workspace: '工作区',
        theme: '外观',
        system: '系统',
        recent: '最近使用',
        footer: '搜索',
        newSession: '新建会话',
        newSessionHint: '在当前工作区开一个新会话',
        switchWorkspace: '切换工作区',
        themeLight: '外观：浅色',
        themeDark: '外观：深色',
        themeSystem: '外观：跟随系统',
        fontBigger: '字号：放大',
        fontSmaller: '字号：缩小',
        fontReset: '字号：恢复默认',
        langZh: '语言：中文',
        langEn: 'Language: English',
        openProfile: '打开 profile 目录',
        openProfileHint: '在访达里定位当前 profile',
        openSessions: '打开 sessions 目录',
        openSessionsHint: '所有会话日志的存放位置',
        plugin: '插件',
        ext: '插件命令',
        pluginOn: '已启用',
        pluginOff: '已禁用',
        enablePlugin: '启用插件',
        disablePlugin: '禁用插件',
        pluginDir: '打开插件目录',
        restartHint: '重启后生效',
        openLogs: '打开日志目录',
        openLogsHint: '宿主运行日志',
        reload: '刷新页面',
        reloadHint: '重新加载客户端（插件更新后用）',
        sessionOpen: '打开会话',
        sessionOpenHint: '跳到这条会话',
        rename: '重命名…',
        renameHint: '改这条会话的标题',
        archive: '归档会话',
        archiveHint: '从侧栏移走（可在归档里找回）',
        fork: 'Fork 到新会话',
        forkHint: '从这条会话分叉出一条新的',
        copyId: '复制会话 ID',
        copyPath: '复制工作目录路径',
        revealPath: '在访达打开工作目录',
        exportMd: '导出为 Markdown…',
        exportMdHint: '把整段对话存成 .md',
        wsOpen: '打开工作区',
        wsNew: '在工作区新建会话',
        wsCopyPath: '复制工作区路径',
        wsReveal: '在访达打开工作区',
        renamePrompt: '输入新标题，回车确认',
        cancelled: '已取消',
        copied: '已复制',
        done: '完成',
        failed: '失败',
        fontNow: '字号',
      },
      en: {
        footer: 'Search',
        placeholder: 'Search sessions and workspaces, or run a command…',
        emptyTitle: 'No matching results',
        emptyFor: 'No results for “{q}”',
        emptySub: 'Try a session title, a workspace path, or a command',
        results: 'results',
        resultsLabel: 'Search results',
        palette: 'Command palette',
        clear: 'Clear',
        hintSelect: 'select',
        hintOpen: 'open',
        hintActions: 'more',
        hintRun: 'run',
        hintBack: 'back',
        hintClose: 'close',
        searching: 'Searching…',
        action: 'Actions',
        session: 'Sessions',
        workspace: 'Workspaces',
        theme: 'Appearance',
        system: 'System',
        recent: 'Recent',
        newSession: 'New session',
        newSessionHint: 'Start a fresh session in the current workspace',
        switchWorkspace: 'Switch workspace',
        themeLight: 'Appearance: light',
        themeDark: 'Appearance: dark',
        themeSystem: 'Appearance: follow system',
        fontBigger: 'Font: larger',
        fontSmaller: 'Font: smaller',
        fontReset: 'Font: reset',
        langZh: '语言：中文',
        langEn: 'Language: English',
        plugin: 'Plugins',
        ext: 'Plugin commands',
        pluginOn: 'enabled',
        pluginOff: 'disabled',
        enablePlugin: 'Enable plugin',
        disablePlugin: 'Disable plugin',
        pluginDir: 'Open plugin folder',
        restartHint: 'takes effect after restart',
        openProfile: 'Open profile folder',
        openProfileHint: 'Reveal the running profile in Finder',
        openSessions: 'Open sessions folder',
        openSessionsHint: 'Where every session log lives',
        openLogs: 'Open log folder',
        openLogsHint: 'Host runtime logs',
        reload: 'Reload page',
        reloadHint: 'Reload the client after a plugin update',
        sessionOpen: 'Open session',
        sessionOpenHint: 'Jump to this session',
        rename: 'Rename…',
        renameHint: 'Change this session title',
        archive: 'Archive session',
        archiveHint: 'Move it out of the sidebar (recoverable)',
        fork: 'Fork into a new session',
        forkHint: 'Branch a new session from this one',
        copyId: 'Copy session id',
        copyPath: 'Copy working directory',
        revealPath: 'Reveal working directory',
        exportMd: 'Export as Markdown…',
        exportMdHint: 'Save the whole conversation as .md',
        wsOpen: 'Open workspace',
        wsNew: 'New session in workspace',
        wsCopyPath: 'Copy workspace path',
        wsReveal: 'Reveal workspace',
        renamePrompt: 'Type a new title, ↵ to confirm',
        cancelled: 'Cancelled',
        copied: 'Copied',
        done: 'Done',
        failed: 'Failed',
        fontNow: 'Font size',
      },
    };

    // ---------------------------------------------------------------------
    // pinyin initials (one letter per code point, 0x4E00 ↔ index 0)
    // ---------------------------------------------------------------------
    var PINYIN_LO = 0x4e00;
    var PINYIN_HI = 0x9fff;
    var PINYIN = 'ydkqsxhwzssxjbymgcczqpssqbycdscdqldylybsgjgyqzjjfgcclzzbwdwzjljpfyynwjjtmyyzwzhflyppqhgccyyymjqyxxgjxhsdsjnjjsmhmlzrxyfsngsyzzqzggllyjlgyzss.cykyyhqwjssggyxyqyjtwkdjhychmyxjtlxjyqbyxdldwrrjjwysrldzjpcbzjjbrcfslbczstzfxxthtrqggbdlyccscymmrfcyqzpwwjjyfcrwfdfzqpyddwyxkyj.wjffxjpdftzyhhycyswccyqsclcxxwzcxnbgnnxbxlzsqcbsgpysyzdhmdzbqbzcwdzzyytzhbtsyyfzgntnxqywqykbphhlxgybfmj.bjhhgqtjcysxstkzglyckglysmzxy.lm.ldccxgzyrcxsdltjzcqkcnnjwhjczzcqljststbnxbtyxc.qxgkwjyflzqlyhjqspsfxlfpbyqxxxydcczylllsjxfhjxpjbcffy.byxbhczbjyclwlczggbtssmdtjcxpthyqtgjjscjfzkjzjqnlzwlslhdzbwjncjzyzsqnycqyrzcjjwybrtwpyftw.xcskdzctbxhyzcyyjxzcfbzzmjyxxcdcz.ttbzljwfcgszsxfyrlnyjmbdthjxsqjccsbxyytsyfbjdztgbcnclcyzzbs.cyzzscjcshzqydxlbpjllmqxtydzxsqjtzpxlcglqccwjbhctdjjsfxj.jjtlbgxsxjmyjjqpfz.syjncydjxkjcdjszcb.rtcclnjqmwnqnclllkbybzzsyhqcltwlccrshllzntyln.wyzyxczxxgdkdmtc.d.jtsyys.dqdfmsd.jlhrwnqlybglxhlgtgxbqjdzfyjsjyjcjmrnymgrcjczgjmzmgxmmryxkjnymsgmzjymklfxmbdtgfbhcjhkylpfmdxlqjjsmtqgzsjlqdldgjyc.lcmzcsdjllnxdjffffjczfmzffpfkhkgdpqxkt.cjdhhzdddrrcfqyjkqccwjdxhwjlyllzgcfcqdsmlzpbjjplsbcjggdckkd.zsqsckjgcgkdjtjllzycxklqscgjcltfpcqczgwbjdqsdjjbyjhsjddwgfsjgdkccctllpspkjgqjhzzljplgjgjjthjjyjzcjmlzlyqbgjwmljkxzdznjqsyzmljlljkywxmkjlhskjgbmclyymkxjqlbmclkmdxxkwyxwslmlpsjqjcqxyjfjtjdxmxxllcrqbsyjbgwywxggbcyxpjtgp.pfgdjgbhbnsfjyzjkjkhxqfgqzkfhygkhdgllsdjjxpqykybnqsxqnszswhbsxwhxwbzzxdmndjbsbkbbzklylxgwxjjw.qzmywsjqlcjxxjqwj.qxscw.tlzhlyyysdzpyqyzcptlshtzcfycyxyljsdcjj.gyslcllyyysglrqq.ldxzscccc.dycjysfsgbfrsszqsbxjpsjwsdrckgjlgdkzjzbdktcsyqpyhstcldjlhmxmcgxyzhjdctmhltxzxylym.hyjcltyfbqqjbfbdf.htksqhzywwcnxxcdwhhwgyjl.gmdqcwgfjhcsntwyd.lbygqqw.sjpwn.lrydzsztxyqpzgcwxhngpyxshmdqjgztdppbfyhzhhjyfdzwkgkzbldntsxhq..gzxylzmmzyjzgszxkhkhtx.xxgyly.psthxdwhzydpx.gkydxbhnhxkdfjnmyhylpmg.cslnzhkxxlbzzlbmlsfbhhgsgyyggbhscy.jtxwlxtzqcwzydqdqmmgdqllszhlsjzwfjhqswsc.lq.zynytlsxth.znkzzsdhlacxtwwcsgqqtddyzbcchyqzflxpslzygpzsznglydqcbdlxjtct.jdkywnsyzljhhdzcwnyyzy.mhychhhxhjkzwsxhdnxlyscqydpclyzwmypbkxyjlkzhtyh.xqsyshx.smchkdscrswjpwqsgzjlwwschs.hsqnhzs.gnd.qtb..lzzmsstdqjcjktscj.xplggxhhg.xzcxpdmmhldgtybysjmxhmrcplxjzckzxshflqxccdhx.zfchzccdytcjyxqhlxdhypjqxnlsyydz.zjnyxq.zysjy.yjkypdgxddxsppyzndlthrhxydpcjjhtcxmctlhbynyhmhzllhnxmylllmdcppxhmxdkycyrdltxjchhznxclcclylnzsxzjzzlnnllwhyqsnjhxynttdkyjpychhy.gkcttwlgqrlggtgtygyhpyhylqyqgcwyqkpyyyttttlhyhlltyttsplkyzwgywgpydqqzzdqxskcqnmjjzzbxyqmjrtfbbtkhzkbjdjjkdjjtlbwfzpbtkqtztgpdgntpjyf.lqmkgxbcclzfhzcllll.dpmxdjhlcclgyhdzfgyddgcyyfgydxkss.bdhykdkdkhn.xxybfbyyhxcqg.bfqyjjdmljcsjzllpchbsxgjyndybyqspqwjlzkcddt.ccbkzdyzypjzqsjnkktknjdjgy.pgtlfyqk.sdntcyhblgdzhbbydmjrygkzyh.yybcmcdtyfzjjhgcjplxhldwxjjkytcyksssmtwcttqzlzbszdtwzxgz.gyktywxlhlcpbcll.qmmzsslcmbjcszzkydczxgqjdsmcytzqqlwzqzxssbpkdfqmddzdsddtdmfhtdyzj.qjqkypbdjyyxtljhdrqxxxh.ydhrjlklytwhllrllrcxylbwsrszzsymkzzhhkyhxksmzsyzgcjfbzbsqlfcxxxnxkxwymsddyqwggqmmyhcdzttfgyyhgstttybykjdhkyjb.lhdypjqnfxfdqkzhqkzbyjtzbxhfdxbd.swh.w.jldyjsfhbldnndnqjtjnchxfjsrfwhzfmdrfjyhwzpdjkzyjymfcyznynxfbytfwfwygdbnzzzdnytxz.mmqbsq.hxfzmbmflzzsrsymjgsxwzjsprydjsjgxhjjgljjynzjjxhgjkymlp.yycsysgqzswhwlyrjlpxslcxmfsmwkcctnxnynpnjszhdz.ptxmwyw.yysywlxjqzqxzdcl...lmcpjpclwbxsqhfwrtffjtnqjhjqdxhwlbyccfjl.lkyyjldxhhycstdywncjtxywdrmdrqhwqcmfjdyzmhm.yxjwmyzqsxtlmrspwwch.jbxtgcypxyyrrclmp.mgkqjszyjrmyjsnxtplnb.ppypylxmyzkynldgyjzczhnlmzhh.nqmpgwqtzmxxmllhgdzxyhxkrxycjmffxyhjfsbssqlhxndyc.nnmtcjcyprrnytyqnyymbmsxndlylysljnlqyshqmllyzlzjjjkymzcsfbzxxmstbjgnxyzhlsnmcqscyznfzlxbrnnnylmnrtgzqys.tswryhyjzmzdhzgzdwybsscskxsyhytsxgcqgxzzbhyxjscrhmkkbsczjyjymkqhzjfnbhmqhysnjnzybknqmcjgqhwlsnzswxkhljhyybqcbfcdsxdldspfzfskjjzwzxsddxjs...gjscssmgclxxkywyllymwwwgydkzjgggtggsycknjwnjpcxbjjtqtjwdsspjxzxnzxwm.lptfsxtllxcljxjjljsxctnswxl.hhlyqrwhsycsqryby.ywj.jqfwqcqqcjqgx.ldbzzyjgkgxpltqyfxjltp.dkyqhpm.tlcpdhkxmtxybhbl.fxdl..gqdyms.whzmljtwyqxlyjzlj..yxbqqffnlyxrdsctgjgxyylkllxqkcctlhjlqmkkzgcyygllljdzgydhzwxpysjbzkdzgyzzhywyfqytyzszy.zklymhjjhtsmqwyzlkyywzcsrkqyqltdxwcdrjklwsqzwbdcqyncjsrszjlkcdcdtlzzz.cqqczddxyplxcbqjylzllljddzjgyjyjzyxnyyynxjxkxd.zwyrdljyyyrjlglldrxjcykywnqcclddnyyykyckczhjxcclgzqjgjwggcqqjysbzzxyjxjbxjfzbsbdsfnsfpzxhdwztdmpptblzzbzdmyypqjrsdzsqzsqxbdgcpzswdwcsqzgmdhzxmwwfybpdgphtmjthzsmmbgzmbzjcfzhfcbbzmqcfmbcmcjxlgpnjbbxgyhyyjgptzgzmqbqdcgybjxlwzkydpdymgcftpfxyztzxdzxtgkmtybbclbj.skytssqyymscxfj.glsllszbqjjj.klyldlycctsxmcwfgkkbqxlllljyxtyltyxytdpjhnhgnkbyqnfjyyzbyy.ss.ssgdyhfhwtcjbsdzjtfdmxhcnjzymqwsrxjdzjqpdqbbsdjggfbkjbxdgjhmgwjjjgdllthzhhyyyyyysxwtyyyccbdbpypzyccztjpzywcbdlfwzcwjdxxhyhlhwczxjtcclcdpxdjczczlyxjjsjbhfxwpywxzptdzzbdccjhjhmlxbqxxbylrddgjrrctttgqsczwmxfytmwzcwjwxjywcskybzqccttqnhxnkxxkhkfhtsw.ccjybcmpzzyjbnnzpbthhjdlscddytyfjpxyngfxbyqxcbhxcbsxtyzdmzysnxsxlhkmzxlthdhkghxjsshqyhhcjyxglhzxcsnh.kdtgqxqypkdh.qtykcnymyyypkqyytjxzlthhqtbyqhxbmyhsqckwwyllhcyylnn.qxqwmcfbdccmljggxdqktlxkgnqcdgzjwyjjlyhhqtttnwchhxcxwh.szjydjccdbqcdgdnyxzdhcqrxcbmztqcbxwgqwyybxhmbymykdy.cmqky.qyngyzslfykkqgyssqyshjgjcnxkzycxsbkyxhyylstycxqthysmgscpmmgcccccmtzt.smgqzjhkl.sqylswtmqsyqkdzljqqyplcycztcqqpbbqjzclpkhqcyyxxdtdddsjcxffllchqxmjlwcjcxtspycxndtjshjwxdqqjckxy.mylsjhml.lykxcyydm.mdqmlmcznnyybzkkyflmchcmlhxrcjjhsylnmtjggzgywjxsrxcwjgjqhqzdqjdzjjzkjkgdzqgjjyjylhzxxcdqhhh.stmhlfsbdjsyyshfyssczqlpbdrfrztzdkykgsctgkwdqzrkmsynbcrxqbjyf.xpzz.dzcjykbcjwhyjbqdzywnyszptdkzpfpb.ztklqyhbbzpnbptyzzybhnydcpjmmcycqmcjfzzdcmnlfpbplngqjtbtt.jzpzbbdnjkljqylnbzqhksjznggqsczkyxchpzsnbcgzkddzq.nzgjkdntlzldwjljzlywtxndjzjhxy.tncbgtzcsskmnjpjytsrwxcfjwjjtkhtzplbhsnjzsyjbwbzyzlstlsbjhdwwqpslmmfbjdw.jyzccjtbnnrzwqxcdslqgdsdpdzhjtqqpsqlyyjzlgyhszlctcbjtktyczjtqkbpjlgmjzdmcsgpynjzjjyyknhrpwszxmtncszzyxybyhyz.xywkcjtllckjjtjhgcxdxyqyczbywblwqcglzgjgqrqcczssbcrbcskydznljsqgxssjm.cnstztpbdlthzwhqwqtz.xnqczgw.skssbybstscsjccgbfsdqszlccglllzghzcthcnmjgyz.znmckcstjmmzckbjygqljyjppldxrgzyxccsnhshgdznlzhzjjcddcbcjflbfqbczzwpqdnhxljcthqwjgylnlszzpcjdscqqhjqkdxkpb.jy.msmjtzdxlcjyryynwjbngzzkmjxltbsllrtpylcsznxjhllhyllqqzqlxymrcwcxsljmczltzldwdjjllnzggqxppskygyggbfzpdkmwghcxmcgdxjmcjsdyc.bxjdlnbcddygskydjtxdjjyxms.q.zdzfslqxyjsjzylblxxwxqqzbjzlfbblylwdsljhxjyzjwtdjcyfqzqzzdcsxzzqlzcdzfchyspympqzmlpplffxjjnzzylsjyyqzfpfzksywjjjhrdjzzxtxxglghtdxcskyswmmtcwyb.zbjkshfhgcxmhfqhyxxyzftsjyzbxyxpzlchmzmbxhzzssyfdmncwd.b.zlxktcshhxkxjjzjsthygxsxyyhhhjwxkzxcsbzzwwhhcwtzzzpjxsnxqqjgzyz.wllcwxzfxgyxyhxmkyyswsqmnjn.ycyspmjkgwcqhyl.jjmzxhmmcnzhbhxclxtjpltxyjhdyylttxfszhyxxsjbjy.yrsmxyplckdlyhlxrlnllstyzyyqygyhhsccsmcctzcxhyqfpyyrpfflfqtntszllzmhwtcjqyzwtllmlmdwmbzssmzrbpdddlgjjbxccsrzqqygwcsxfwzlxccrbtdzmcyggdlqsgtjmwljmymmsyhfbjdgyxccpshxczcsbsjwjgjmpbw.ffyfnxhydxzylr.mzgzcyhsszdlljcsqfzxxkptxzgxjjgbmyyysnbdylbnlhbfzdcyfbmgqrrmsszxysgtznnydzzcdgbj.fjbdknzblcsscpsgzycjszlmlrzzbzzldlsllysxsqzqlyxzlsgkbrxbrbzcycxzjz..yfgklzlyyhgysgzlfjhgtgwkr..jyzkzqtsshjjxdzyz.yjlzyrzdqqhgjzxsszbtkjpbfrtjxllfqwjgslqtymblpzdxtz.gbdhzzrbgjhwnjtjxlhscfsmwlldqysjtxkzscfwjlbxftzlljzllqblcqmqqcgcdfpbbhzczjlpyygjdtgwdcfczqyyyqysrclqzfklzzzgffsqnwglhjycjjczlqzcyjbjzzbpdccmhjgxdqdgdlzqmfgpsytsdyfwwdjzjysxyycjcyhzwpbyhxrylybhkjksfxtzjmmchhlltnyymsxxyzpyjjycdyzwmtjjkqyrhllqxpsgtlwycljscbxjyzfnmlrgjjtyzbsyzmsjyjhgfzqmsyxrszcwtlrtqzsstkxgqggsptgcdnjsgcqcqhmxggztqydjkzdlbzsxjlhyqgggthqscpyhjhhgnygkggcmjdzllcclxqsftgzslllmlcskctbljzzszmmnytpzsxqhjcjyqxy.xzqzcpshkzzysxcdfgmwqrllqxrfztlysdctmjcsjjdhjnxtnrztzfqrhqgllgcxszzjdjlxcytsjtlnyxhszxcgjzyqpylfhdjsbpcczgjjjqzjqdybssllcmyttmqtbhjqnnygkynqyqmzgcjkpdcgmyzhqllsllclmh.lzgdylfzsljcqzlylzcj.shnyllqxgjxlyjyyyxnbcljsswcqqcjyllcldjyllzllbnylgqchxyyq.xccqkyjxxhyklksx.yqccqkkkkcsgyxxyqxygwtj.hthxpxxcsshcy.ychzzcbwqbbwjqcscszsslzylgd.sjzmmymcytsdsxxscjpqqsqylyfzychdjdzywcbtjsydjhcyddjlbdjjs.dzyqysqkxxdhhgqjy.hdyxwgmmm.jdybbbppbcmhcpljzsmtx.rxjmhqdstpjdcbssmsssthjtslmmtrcplzszmlqdsdmjmqpnqdxcfynnfsdqqyxhy.ykqyddlqyyysszbydslntfgtzqbzmchdhczcwfdxtmqqsphqwwxsrgjcwtjtzzqmgwjjrjhtqjbbgwzfxjhnqfxxqywyyhyscdydhhqmnmdmmcpbszppzzglmzf.llcfwhmmsjzttthlmyffytzzgzyskjjxqyjzqphmbzzlyghgfmshpcfzsnclpbqsnjszslxjfpmtyjygbxlldlxpzjypjyhhzcywhjylsj.xfsszywxkzjll.dtmlymqjpwxxhxsktqj.zrpxxzghmhwqpwqlyjjqjjzszcfhjlchhnxjlqwzjhbmzyxbdhhypylhlhlgfwlcfyytlhjjcjmscpxstkpnhjxsntyxxt.stjctlsslstdlllwwyhdhrjzsfgxssyczykwhtdhwjslhtzdqdjzxxqggyltzphcsqfzlnjtclzpfstpdynylgmjllycqhynsbchylhqyqtmzybbywrfqykjsyslzdyjmpxyyssrhzjnyqtqdfzbwwdwwrxcwhgyhxmkmyyyhmsmzhngc.pmlqqmtcwctmhmxjpjjhfxyyzsjzhtybmstsyjdtjjqytlhynbyqzlcxcnzwsmylkfjxlwgbypjytysylymzckttwlgsmzsylmpwlzwxwqzss.qsyxyrhssntsr.pccpwcmgdhhxzdzxfjhgzttsbjhgyglzysmyclllybtyxhbbzjkssdm.lhhycfygmqypjycqxjllljgclzgqlycjcct.tyxmtmshllwcgfxymzmklpszzzxhhjyslctyjcyhxsgyxzkxlzwpyjpdhjwpjpwsqqxlxxdhmrslzcyzwstcxkystzshbsccstplwsscjchjlcgchssphylhfhhxjsx.llnylmzdhzxylsxlwzyhcldy.hzcmddyspjtqjzlngjfsjshctsdszlblmssmnyymjqbjhrcwtyydchqlj.pzwbgqybkfcmjwlzllyylszydwhxpsbcmljpscgbhxlqhyrljxyswxhxzlldfhlslymjljyflyjycdrjlfsyzfsllcqyqfgjyhyszlylmstdjcyhbzllnwlxxygyyhbmgdhxxhhlzzjzxczzzcyqzfnjwpylcpkpykpmclqkdgxzggwqbdxzzkzfbxxlzxjtpjpttbytszzdwslchzhsltjxhqlhyxxxywzyswtmzkhlxzxzpyhgchkjfsyh.tjrlxfjxptztwhplyxfcrhxshxkjxxyhzjdxjwylhyhmjdbflkhtxcwhcfwjcfpqrxqxcyyyjygrpxgscsxngqchkzdxhflxxhjjbyzwtsxnncyjjymswzjqrmhxzwfqsylzjzgbhynshbgttcs.bhxxwxyhhxyxnsqyxmlywrgyqlxbbcljsylpsytjzyhyz.wlh.rjmksczjxxxyxchcytryxqjddsjfslyltsffyxlmtyjmzjyyyxltzcsxqzlhzxlwyxzhdnlrxhxjcdyhlbrlmbrll.xksllljlyxxlycrylcjcgqcmtlzllcyzzpzpcy.whjjfybdyyzs.pckzdqyqpbpcjpdcyzbdbbcyydycnnpjmtmlrmfmmgwygbsjgygsmdqqqztxmkqwgxllpjgzbqcdjjjfpkjkcxbljmswmdtqjxldlppbxcwkcqqbfqjcz.gzgmykbhyyhzykndkzmbpjyspxthlfpnyygxjdbkxnhhjhzjxstrstldxskzysybmxjlxyslbzyslhxjpfxbqnbylljqkygzmcyzzymccsldlhzgwfwyxzmwcxtynxjhbyymcysbmhysmydyshqyzchmjjmzc..hcbjbbhplxtylsxsdjgjdhkxxtxxnbhnmlngsltxmrhnlxqjxmzllyswqgdlbjhdcgjyqycmhwfwjybbbyjmjwjmdpwhxqldy.pdfxxbcgjspckrssyzjmslbzzjfljjjlgxzgyxyxlszqyxb.xyxhgcxbpldyhw.cdwwcjmbtxchxyqxllxflyxlljlssfwdpzsmyjclmswtczbchq.kcqbwlcgydblqppqzqfjqdjhymmcxtxdrmjwrhxcjzclqxdyynhyyhrslsrsywwzjymtltllgzqcjzy.bsckzcjyccqljsqx.lmzyyywlwdxzxqdllqshgpjfjljhj.bcqzdjgthhsstcyjlbswzlxzxrwgldlzrlzqtgsllllzlymxqgdzhgbdbhzpbrlw.xqbpfdw...thlypcbjcc.dmbzpbzz.cyqxld.mzblzwpdwyygdstthcsqsccrsssyslfybfntyjszdfndpthtzzmbblxlcmyffgtjjqwftmdpjwdnlbzcmmctgbdzlqlpyfhsymjylsdchdzjwjcctljcldtljjcpddpjdsszynndbjlggjzxsxnlycybjjqxcbylzcfzppgkcxzdzfztjjfjsjxzbnzyjqttyjwhtyczhymdjxttmpxsflzcdwslshxybzgtfmlcjt.cbbmgd.wycyzcdszcyhflyctygwhkjyylsjcxgywjcbhlcsnddbtzbsclyzczzssqdllmqyyhfllqllxfdyh.bxggnywyypllsdldllbjcyxjzmlhljdxyyqytdlllbbgbfdfbbqjzzmdpjhgclgmjjpg..hhbwcqx.xhhhzchxyphj.xhlphjpgpzjqcqzgjjzzgzdmqyybzzphyhybwh.zyjhykfgdpfqsdlzmljxjpg.lxzd.glmdgxmwzqytxdxxpfdmmssympfmdmmkxksyzyshdzkjsysmmzzzmsydnzzczxbmlstmddnmxckjmztyymzmzzmsshhdccj.mxxkljstgwlsqlyjzllsjssdbpmhnlyjczyhmxxhgzcjmdhxtkgrmxfwmckmwkdcksxqmmmfzzydkmsclcmpcgmwrpxqpzdsslcxkyxtmlgjy.hzjgzqmcsnxyhmmpmlkjxmhlmlgmxctkzmjjyszjsyszhsyjzjcd.jzybsdqjzgwzkgxfkdmsdjlfm.hkzqkjb.ypzyszcdwyjffmzjykttdzz.fmzlbnpplplpbpsz.lltylkckqzkg.nqlw.gxxydpxlhsxqhwqykxqclhyxxmlyccwlymqyskychlcjnszkpyzkcqzqljbdmdjhl.sqlbydwqlwdnbqcrydddtjybkbwszdxdtnpjdtctqdfxqqmgns.clstbhpwslctxxlpwydzklzygzcq.pllkccylbqmqczqcljslqzdjxldthpzqdljjxzqdjyzhkzljcyqdyjppyp..kjyrmpcbymcxkllzllfqpylllmbsglcysslrsysqtmxyxqqzbdzrysyztffmzzsmzqhzssccmlyxwtpzgxzjgzgsjsgkddhtqggzllbjdzlcbzhyxyzhzfywxyzymsdbzzyjgtsmtfxqyxjscdgslnmdlrytzlryylxqhtxsrtzcgyxbnqqzfhykmzjbzymkbpnlyzpblmcnqyzzzsjzhjctzhhyzzjrdyzhnfxglfxslkgjtctssyllgzrzbbjzzklpkbczyslxyxbjfpnjzzxcdwxzyjxzzdjjgggrsrjkmcmzjlsjywqshyhqjsxpjzzzlsnshrnypjtwchklbsrzlcxwjqxqkysjycztlqzybbybwzjqdwgyzcytjcjxckcwdkkzxsgkdzxwwyyjqyytcytdjlxwkczkklcclzcqqdzlqlcsfqchqhsfsmqzzllbjjzbsjhtsjdysjqjpdlzcdcwjkjzzlpycgmzwdjjbsjqzsyzyhhxcbbjydssddzncglqmbtsfcbfdzdlznfgfjgfsmpsjqlmblgqcyyxbqkdxjqsrfkztjdhczklbsdzcfytplljgjhtxzcsszzxstcygkgckgy.qxjplzbbbgtgyjdgczqszlbjlsjfzgkqqjcgyczbzqtldxrjxbsxxpzxhyzyclwdsjjhxmfczpfzhqhqmqgkylyhtycgfrzgnqxclpdlbzcsczqlljblhbdcypczppdymtzsgyhckcpzjgslclnscdsldzxbmsdlddfjmkdjdhslzxlszqpqpgjllybdszgqlbzlslkyyhzttncjyqtzzfszqztlljtyyllqllqyzqlbdzlslyyzymdfszsnhlxznczqzbbwskrfbcyzmthblgjpmczzcstlxshtzcyzlzblf.qhlxflcjlyljqcbzlzjghsstbrmhxzhjzclxfnbgxgtqjcztmsfzkjmssnxljkbhszxntnlzdntlmsjxgzjyjczxyhyhwrwwqnztnfjscpzshzjfyrdjsfscjzhjfzqzchzlxfxsbzqlzsgyftzdcszxzjbqmszkjrhxjzcgbjkhchgtjkjqglxbxfgdrtylxjxgdtsjxhjzjjcmzlcqsbtxhqgxttxhxftsdkfjhzyjfjxrzcdlllcqsqqzqwqxswqtwgwbzcgcllqzbclmqqtzgzxzxljfrmyzflxyszxxjkxrmjdcdmmyxbsqbhgcmwfwtgmxlzbyytgzyccdxyzxswgxyjyznbgpzjcqsyxcxrtfycgrhztxszzthcbfclsyxzljqmzlmplmxzjssflbysmyqhxjzxrxsqzzzsslyflczjrcrxhhzxqwdshxsjjhzcxjbdynsysxjbqlpxzqpymlxzkyxlxcjlcycrxzzlldlllsjyhzxgyjwkjrwyhcpsgnrzlfzwfzznsxgxflzsxzzzbfcsyjdbrjkrdhhgxjljjtgxjxxstjtjxlyxqfcsgswmsbctlqzzwlzzkxjmltmjyhsddbxgzhdlbmyjfrzfcgclyjbpmlysmsxlszjqqhjzfxgfqfqbpxzgyyqxgztcqwyltlgwwgwhllfsfgzjmgmgbgtjfsyzzgzyz.flsspmlbflcwbjzcljjmzlpjjlymqdmyyyfbgygqzglyzdxqyxrqqqhsxyyqqygjtyxfsfsllgnqcygycwfhcccfxbylypllzqxxxxxkqhhxshjdcfdsczjxcpzwhhhhh.pylh.lpq.fyhxdyllkmzqgggdd.srnndltzgchybpysqjjhclljt.lnjpzljlhymh.ydydsqycddhgzpndzclzywllznt.ytgxlhslpjjbdgwxpcdntjcklkclwkllc.sstknzdnqnttlyyzssysszzryljqkcgbhhcrxrzydgrgcwcgzhfffppjfzyn.krgywyqpqxxfkjtszzxswzddfbbqtbgtzfznpzfpzxzpjszbmqhkcyxyldkljnypkyghgdcjxx..hpnzgctzcmxcxmmjxnkszqnmnlwbwwxjjyhclstmcsqtjcxxtpcnpdtnnpglllzcjlspblplkcdtnjnlyyrscffjfqwdpgzdwmnzccl.d.xnssnyzr.styjwjyjdbcfxnmwttbqlwstszgybljpxglb.clgpcbjftmxzljylzxcltpnclcgxtfzjshcrxsfyszdkntlbyjcyjllstgqcbxnwzxbxklylhzlqzlnzcqwgzlgzjncjgcmnzzgjdzxtzjxycyycxxjyyxjjxsssjstssttppghtcsxwzdcsyfptfbchfbblzjclzzdbxgcxlqpxkfzflsyltywbmnjhskbmddbcysccldxycddqlyjjhmqllcsgljjsyfpyyccyltj.ntjjpwycmmgqyysqdhqmzhszxpftwwzqswqrfkjlxjqqyfbrxjhhfwjgzyq.cmyfrhcyybyqwlp.xcczstyrltsdmqlykmbbgmyyjprknnbbsxyxbhyzdjdnghpmfsgbwfzmfjmmbcmzzcjjlcnyxyqgmlrygqccyhzlwjgcjcggmcjjfyzzjhycfrrcmtzqzxhfqgdjxccj..qcrjthpljlszdjrbcqhjdzrhxlyxjsymhzydwldfryhbbydtssccwbxglpzmlzztqsscpjmmxjcsjytycghycjwsnsxlf.mwjnmkllswtxhyyygcmmcwjdqdjzglljwjnkhpzggflccsczmcbltbhbqjxqdjpdjqtghglfq.wbzyjjltstdhqhctcbchflqmpwdshyytqwcnztjtlbypbpdyyyxsqkxwyyflxxncwcxybm..lykkjmzzzbrxy.qjfljpfhhhytzzxrgqqmhspgdzjwbwpjhzjdyscqwzkthxsqlzyymysdzgrxckkhjlwpysyscsyzlrmlqsyljxbcxtlhdqzpcycykpppnsxfyzjjrc.mhszmsxlxglrwgcstlrsxbygbzgztcpldjlslylymdtmtcp.lcxpqjcjwtcyyzlblxbzlqmyljbghdslssdmxmbdczsxwh.mlczcpjmcnhjyjnsygchskqmzzqdllk.blwjqsfm.cdxjrrlyqchjmybyqlrh.tfjzfrfksryxfjdwdsxxlwsqjyslyxwjhsnlxyyxhbh.whhjcxwmyljcsqlkydttxbzsxfdxgxsjhhsxxybssxdpwncmrptjzcz.nygcxqfjxkjbdmljcmqqxl.xslyxxlylljdzbtymhbfsttqqwlh.gyblsc.lzxqlhtwrrqhlstmypyxjjxmqsjpnbryxyjllyqylthylqyfmhkljdmllhfzwkzhljmlhljkljstlqxylmbhhlnlsxqchxcfxxlhyhjjgbyzzkbxscqdjqdsxjzsyhzhhmgsxcsymxf.bcqwwrbpyyjqtyqcyjhqqzyhmwffhgzfrjfcdbxndqyzpcyhhjlfrzgppxzdbbgzqstlgdgylcqmgchhmfywlzyxkjlypqhsywmqqgqzmlzjnsqxjqsyjtcb.hsxfssfxzwfllbcyyjdytdthwzsfjmqqyjlmqsxlldttkhhybfpwdyysqqrnqwlgwd.bdwcyygcdlkjxtmxmyjsxhybrwfymwfrxyqmxysctzztfykmldhqdlwyqnlcryjtlpsxcxywlsbrrjwxhqybhtydnhhgmmywytzcsqmdssccd.lwztcpqpyjllqzyjswxwzzmmglmxclmxczmxmzsqtzppjqblpgxjzhfljjhycjsnxwcxsccdlxsyjdcqcxslqyclzxlzzxmxqrjmhrhzjphmfljlmlclqnldxzlllfypngjysxcqqdcmqjzzxhnpnxzm.kmxxykyqlxsxtxjxyhwdcwdzhqyybgybcyscfgfsjnzdyzzjzxrzrqjjymc.nhrjtldbpyzbstjhxxzypbdwfgzzrpymtngxzqbyxmbbfcckrjjjbj.grzgyclkhzdxkknsjkcljspgyyzlqqjybzssqlllkjfcbktylcccdblsppfylgydtzjyqggkqttfcxbdkdxxhybbfytyhbclpdytgdhryrnjsbtcsnyjqhklllzslydxxwbcjqsbxbfjzjcjdzfbxxbrml.zgcsnclbjdstblfrzdswsbxbcllxxlzdjzsjpylyxxyftfffbhjjjgbygjpmmmmsscljmtlyzjxswxtyl.dqpjmygqzjgdjlqjwjqllsdgjgygmscljjxdtygjqjqjcjzcjgdzdshqgsjggcjhqxsnjlzzbxhsgzxcxyljxyxyydfqqjhjfxdhctxjyrxysqtjxy.fyyssyxjxncyzxfxcsyszxyyschshxzzzgzzzgfjdldylnpzgyjyzyyqzpbxqbdztzczyxxyhhscxshcggqhjhgxwsztmzm.hyxg.btylzkkwytjzrcl.k.stdbcykqqs.yxcjxwwgsbhjszsdhcsjkqcxswxfctynydpzcczjqtzwjqdzzzqzljchlsbhpydxpsxshh.zdxfptjqyzzxhy.xncfzyyhxgnqmywxtzsjpkhhgymxmxqcxtsbcqsjyxhtyylybcqlmmszmjzjllc.gxz..jzyhjmchhcxzsxzdznl.yjjzjbhzwzzsqtzpsxztdsxjjjzny.zphhyysrnqdthzh.yjyjhdzxzlswclybzy.cwcycrylcxnhzydzydyjdfrjjhtrsqtxyxjrjh.jynx.lxsfsfjzghpzsxzszdzcqzbyyklsgsjhczshdgqgxyzgxchxzjwyqwgyhkss.qzzndzfkwyssdclzstsymcdhjxxyw.yxcz.ydmpxmdsxybsqmjmzjmtzqlpjyqzcgqhxjhhhxxhlhdldjqsldwbsxfzzyyschtytyjbh.cxhjkgjfxbhyzjfxbwhbdzfyzbc.pnpgnydmsxhkhhm.mlnbyjtmpxyjmcthjbzyfcgtyhwphftgzz.zsbz.gpbmdskftycmhbllhgpzjxzjgzjyxzsbbqsczzlzccstpgxmjsftcczjzdjxcybzlfcjsyzfgszlybcwzzbyzdzypswyjgxzbdsysxlgzbzfygczxbzhzftpbgzg.jbstgkdmfhyzzjhzllzzgjqzlsfdjsscbzgpdlfzfzszyzyzsygcxsntxchczxtzzljfzgqsqyxzjqccccdjcdxzjyqjccgxztdlgscxzsyjjqtcclqdqztqchqqjzt.zzzpbkkdjfcjfztybqyqttynlmbdktjcpqzjdzfpjsbnjlgyjdxjdzqkzgqkxclpzjtcjdqbxdjjjstcjnxbxcmslyjcqmtjqwwcjjnjnlllhjcwqtbzqyczczpzzdzyddcyzdzccjgtjfzdprntctjdcqtqndtjnplzbcllctdsxkjzqdpzlbznbtjdcxfczdbccjjltqjpldcgzdbbzjcqdcjwynllzlzccdwllxwzlxrsntqjccxkjlsgdfqtddglrl.jjtklymkqlldzytdyycygjwyxdxfrskstcd.nqmrkqzhhqkdld.zfkypbggpzr.bzzykyzsp.gjjglkqzzzslysywyzwfqznlzzlzhwcgkypqgnpgblplrrjyxcccgyhsfzfwbzywtgzxyljczwhxzjzblfflgskhyjz.yjhlpllllcygxdrz.lrhgklzzyhzlyqszzjzqljzflnbhgwlczcfjwspyxnlzlxgccpzbllcxbbbbxbbcbbcrnncccyrbbsyldcgqyyqxygmqzwtzydyjhyfwd.hzdjywlccntzyjjcd.dpzdztstqjhdymbjnyjzlxtsstphndjxxbyxqtzqddtjtdyztgwscszqflshlglbcjbhdlyzjyckwtydylbnydsdsycctyszyy.bg.xhqddwnygyclxtdcystqmygz.sccszzddlcclzrqxyy.ljsbymxshzt.mbbllyyllytdqyshymrqxkfkbfxnxsbychxbwjyhtqbpbsbwdzylkgzskyghqzjhhxjxgnljkzlyycdxlfwfghljgjybxblybxqpqgztzplncybxdjyqydymrb.sjyyhkxxstmxrczzywxyhybmcflyzhqyzmqxdbxbzwzmslpdmyckfmzklzcyjycclhxfzlydqzpzygyjyzmzxdzfyfyttqtchgspczmlccytzxjcytjmkslpzhysnwllytpzctzzcktxdhxxtqcypksmqccyy.zhtjpcylzlyjbjxtfnyljyynrxcylmmnxjsmybcsysslzylljjgyldzdpqbfzzblfndsqkczfhhhgqmrdsxycstxnqqjpyjbfcxdyqfbnx.jdgyqbsrcnfyyqpghyjdyzxgrhtkyl.qdzntsmgklbsgbpyszbytjzsstjcssxzbhbscsbzczptqfzmqflypybbjgszmxxdjmthyskkbjtxhjc.gbsmjyjzcxtmljyxrzzqscxxqptzxmkyxxxjcljprmyyg.dyskqls.dhrskqxzxztcghztlmlwxybwsycdbhjhcfcwzsxhytkzlxqshlyczjx.mplprcgltbzztlzjcyjgdtclglpllqpjmzp.pxyzl.ktkdnczzbnzctdqqzjyjgmctxltgcszlmlhbglkfbnwzhdxphlfmkydlgxdtwzfrj.jctzhydxykshwfzcqshktmqqhtchymjdjskhxzjzbzzxymp.jjmsdbxlsklyynwrtsqlscbpdbsgzwyhtlkssswhzzlyytnxjgmjszsxfwnls.ztxgxls.mmlbwldszyl.kqcqctmycfjbslxclzjclxxksbjqclhjphqplsxsckslnhpsfqqytxjjzlqldxzjjzdyydjnzptfcdskjfsljhylzqjzlbthydgdjfdby.zxdzhzjnhhqbyknxjjqczmlljzkspldsclbblxkl.lxjlbjycxjxgcnlcqplzlznjtzljgyzdzpltqcssfdmnycxgbtjdcznbgbqyqjwgkfhtnbyqzqgbkpbbyzmtjdytblsqmbsxtbnpdxkl.myycjynzdtldykzzxddxhqshdgmzsjycct.yrzlpwltlkxslzcgg.xclfxlkjrtlqj.qzncmbqdkkcxglczjzxjhptdjjmzqykqs.cqzdshh.dmlzfmmzbgntjnnlgbyjbrbtmlbyjdzxlcjlpldlpcqdhlhzlycblcxzcj.dqlmzmmsshmybhbskkbhrsxxjmxsdznzpxlbbr.gggfchgmsklltsjyycqlcskywy.hywhbhqywb.wykqldqftntkhqcgdqktgpkxhcpdhtwtmssyhbwcrwxhjmkmzngwtmlkfghkjyldyycxwhy.clqhkqhtdqhhffldxqwgzyyd.sbpkyrzpjfyyzjc.qdzzdl.ttbbfjllcxdlmjsdx.gygsjqxcfbxsszpdyzcxdnyxpfzydlyjccpltxlsxyzyrxcyysdylwwnds.hjsygyhgywk.xtjzd.xysrltdjss.xfn.jdxyzhlxlllzhzsjnyqyqqxyjghzgjcyjchzlycdshwsgczyjxcllnxzjjyyxnfsmwfpylcyll.bwddhwdxjmcxztzpmlqzhsfhzynztlldywlslxhymmylmbwwkyxy.dtxylldjpybpwfxjmmmllh.fdll.flbhhhbqqjtzjcqjjdjtffkmmmbythygdcqrddwrqjxnbysnmzdbyytbjhpybygtjx..hgqdqtmystqxkbtsbkjlxrb.qqhqmjjbdjwtgtbxpgbktlgqxjjjcdhxqdwjlwrfmqgwqhckryswgbtgygbwsdwdwrfhwytjjxxxjyzyslphyyp.yxhydqkxshxyx.skqhywbdddpplcjlhq..wxksyyhdyplfjthkjltcyyhhjttpltzzcdlthqkcxqyst..ywkyzyxxyysddjkllpwmcyhqgxyhcrmbxpllnqydqhxsxxwgdqbshyllpjjjthyjkyphthyykty.zy.nmdshlcrpqfbgfxzbsbtlgxsjbswyysksflxlpplbbblbsfxfyzbsjssylpbbffffsscjdstzsxtryjcyffsytyzbjtbctsbsdhrtjjbytcxyj.ygxcbn.bjdsysyhgsjzbxbytfzwg.nyhhthjh.tfwgcstbgxklstywmtmbyxjskzscdyjrcytwxzfhmymcxlznsdjtttxrycfyjsbsdy.rxhljxbbd.ynjghxgckgscymblxjmsznskgxfbnbbthfj..fxyxfpxmyfhdtzcxzzpxrsywzdlybbjtyqwqjpzypzjznjpzjlztfysbttslmptzrtdxqsj.hbzylzdhljsqmlhtxtj.cx.lzzspktlzkqqyfsygywpcpqfhqhytqxzkrsgtgsqczlptxcdyyzssqzslxlzm.cbcqbzyxhbsxlzdltcdjtylzjyytpzylltxjsjxhlbmytxcqrblzssfjzztnjydxmyjhlhpblcyxqjqqkzzscpzksw.lqsblcczjsxgwwwygy.tjbbctdkhqhkgtgpbkqyslbxbbckbmllxdzstbklggqkqlsbkkdfxrmdkbftpzfrtbbmf.rqgxkjpzsstlbzdpszqzsjthljqlzbpmsmmsxlqqnhknblrddnhxdhddjcyygyfqgzlgsygmjqgkhbpmxyxlytqwlwgcpbmjxcyzydrjbhtdjx..shtmjsbyplwhlzffnypmhxqhpltbqpfbcwjdbygpnxtbfzjgsddtjshx..wzzyllttybwjkgxghlfkxdjtmszsqynzggswqsphtlsskmclzxyszqzxncjdqgzdlfnykljcjllzlmzznhydsshthxzlzzbbhqzwwycrdhlyqqjb.yfsgxthsrxwqhwfslmssgztty.yqqwrsl.lhmjtqjsmxqbjjzjxzyzkxbyqxbjxshzssfglxmxzxfghkzszggylcls.rjxhslllmzx.lglxydjytlfbhbpnlyzfbbhptgjkw.tzhkjjxzxxglljlstgshjjyqlqzfkcgnndjsszfdbctwws.qfhqjbs.qtgypjlbxbmmywxgslzhglzgnyfljbyfdjfrgsfmbyzhqfbwjsyfyjjphzbyyzffw.dgrlmftmlbzgycqxcdjygzyyyytytydw.g.zyhxjlzythlrmgrjxzclhn.ljjthtbwjybjjbxjjtjt..khwslzplpsf.zpqqbdlqjjtyyqlyzkdksqjyyjzldqcgjjyzjsycmr.qtht.jmfctyhypkmhycwjdcfhyyxwshctxrljgjshccyyyjltkttytmxgtcjtz.yy.czlylbszywjytsjyhbyshfjlygjxxtmzyyltxxypclxyjzyzyypnhmymdyylblhlsyygqllnjjyms.ycbzgdlyxylcqyxtsz.gxhzglhwbljg.yxtwqm.kbpqcgyshh.gqcmwyywljyjhyyzlljjylhzyhmgsljljxcjjyclycjpcpzjzjmmylcjlnqljjjlxxjmlszljqlycmmhcfmmfpqqmfxlqmcffqmmmmhmznfhhjgtthhkhslnchhyqdxtmmqdcydyxyqmyqylddcyyyd.zdcymzydlzfffmmycqcwzzm.btbyctdmndzggdftypcgqyttssffwbdtzqssystwjjhjytsxxylbyqhwwhx.zxwznnqzjzjjqjccchyyxbzxccyjtllcqxknjycyycynzzqyy..wyczdcjycchyjlbtzkycqwlpgpyllgkdldlgkgqbgychjxy....z.w...z....s.....l.......sl..z....lgtm....gd......................tn..hbltdzl.tmmbj.lx';

    function initialOf(code) {
      if (code < PINYIN_LO || code > PINYIN_HI) return '';
      var letter = PINYIN.charAt(code - PINYIN_LO);
      return letter === '.' ? '' : letter;
    }

    /** Latin text is kept; CJK turns into the pinyin initial; everything else is dropped. */
    function initials(text) {
      var out = '';
      var source = String(text || '');
      for (var i = 0; i < source.length; i += 1) {
        var code = source.charCodeAt(i);
        if (code >= 48 && code <= 57) out += source.charAt(i);
        else if (code >= 97 && code <= 122) out += source.charAt(i);
        else if (code >= 65 && code <= 90) out += source.charAt(i).toLowerCase();
        else out += initialOf(code);
      }
      return out;
    }

    // ---------------------------------------------------------------------
    // shared open/closed store: the overlay and the footer button both drive it
    // ---------------------------------------------------------------------
    var store = {
      open: false,
      listeners: new Set(),
      set(next) {
        if (store.open === next) return;
        store.open = next;
        store.listeners.forEach((fn) => {
          try {
            fn(next);
          } catch {
            /* a broken listener must not break the palette */
          }
        });
      },
      toggle() {
        store.set(!store.open);
      },
    };

    var extCommands = [];
    var extListeners = new Set();

    function emitExt() {
      extListeners.forEach((fn) => {
        try {
          fn();
        } catch {
          /* ignore */
        }
      });
    }

    /** A plugin can contribute a row: { id, title, sub?, group?, run(ctx) }. */
    function registerCommand(command) {
      if (!command || typeof command.id !== 'string' || !command.id) return false;
      if (typeof command.title !== 'string' || !command.title) return false;
      if (typeof command.run !== 'function') return false;
      extCommands = extCommands.filter((entry) => entry.id !== command.id);
      extCommands.push(command);
      emitExt();
      return true;
    }

    function unregisterCommand(id) {
      var before = extCommands.length;
      extCommands = extCommands.filter((entry) => entry.id !== id);
      if (extCommands.length !== before) emitExt();
    }

    function useExtCommands() {
      var [, bump] = useState(0);
      useEffect(() => {
        var listener = () => bump((value) => value + 1);
        extListeners.add(listener);
        return () => extListeners.delete(listener);
      }, []);
      return extCommands;
    }

    function useOpen() {
      var [open, setOpen] = useState(store.open);
      useEffect(() => {
        var listener = (value) => setOpen(value);
        store.listeners.add(listener);
        setOpen(store.open);
        return () => store.listeners.delete(listener);
      }, []);
      return open;
    }

    function activeLocale(ctx) {
      try {
        var snapshot = ctx.locale.getLocale();
        return (snapshot && snapshot.active) || 'zh';
      } catch {
        return 'zh';
      }
    }

    function useLang(ctx) {
      var [locale, setLocale] = useState(() => activeLocale(ctx));
      useEffect(() => {
        if (!ctx.locale || typeof ctx.locale.subscribe !== 'function') return undefined;
        return ctx.locale.subscribe(() => setLocale(activeLocale(ctx)));
      }, []);
      return /^zh/i.test(String(locale)) ? 'zh' : 'en';
    }

    function copy(lang) {
      return STRINGS[lang] || STRINGS.zh;
    }

    function request(path, body) {
      var init = body === undefined ? { headers: { Accept: 'application/json' } } : {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      };
      return fetch(path, init).then((response) =>
        response.json().then(
          (payload) => {
            if (!response.ok || !payload || payload.ok !== true) {
              var message = payload && payload.error ? payload.error : 'HTTP ' + response.status;
              throw new Error(message);
            }
            return payload;
          },
          () => {
            throw new Error('HTTP ' + response.status);
          },
        ),
      );
    }

    function getJson(path) {
      return request(path);
    }

    // ---------------------------------------------------------------------
    // ranking
    // ---------------------------------------------------------------------
    function fuzzy(query, text) {
      var needle = String(query || '').toLowerCase();
      var hay = String(text || '').toLowerCase();
      if (!needle) return 0.12;
      if (!hay) return 0;
      var direct = hay.indexOf(needle);
      if (direct === 0) return 1;
      if (direct > 0) return 0.86 - Math.min(direct, 40) * 0.004;
      // pinyin initials: "cj" should reach 插件
      var py = initials(hay);
      if (py) {
        var at = py.indexOf(needle);
        if (at === 0) return 0.78;
        if (at > 0) return 0.62 - Math.min(at, 30) * 0.004;
      }
      // subsequence, in order, on the raw text
      var cursor = 0;
      var hits = 0;
      for (var i = 0; i < hay.length && cursor < needle.length; i += 1) {
        if (hay.charAt(i) === needle.charAt(cursor)) {
          cursor += 1;
          hits += 1;
        }
      }
      if (cursor === needle.length) return 0.4 + Math.min(hits, 12) * 0.01 - Math.min(hay.length, 200) * 0.0004;
      return 0;
    }

    function scoreOf(query, item) {
      var best = fuzzy(query, item.title);
      if (item.sub) best = Math.max(best, fuzzy(query, item.sub) * 0.72);
      if (item.keys) {
        for (var i = 0; i < item.keys.length; i += 1) {
          best = Math.max(best, fuzzy(query, item.keys[i]) * 0.9);
        }
      }
      return best;
    }

    // ---------------------------------------------------------------------
    // recency memory: a small weight on things the user already reached for
    // ---------------------------------------------------------------------
    function readRecent() {
      try {
        var raw = window.localStorage.getItem(RECENT_KEY);
        var parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch {
        return {};
      }
    }

    function bumpRecent(key) {
      if (!key) return;
      try {
        var map = readRecent();
        var entry = map[key] || { count: 0, at: 0 };
        entry.count = Math.min((entry.count || 0) + 1, 40);
        entry.at = Date.now();
        map[key] = entry;
        var keys = Object.keys(map);
        if (keys.length > 60) {
          keys
            .sort((a, b) => (map[a].at || 0) - (map[b].at || 0))
            .slice(0, keys.length - 60)
            .forEach((old) => {
              delete map[old];
            });
        }
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(map));
        return map;
      } catch {
        return {};
      }
    }

    // ---------------------------------------------------------------------
    // item helpers
    // ---------------------------------------------------------------------
    function item(key, group, title, sub, run, actions) {
      return { key: key, group: group, title: title, sub: sub || '', run: run, actions: actions || null };
    }

    function copyText(text) {
      if (!text) return Promise.reject(new Error('empty'));
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
      return Promise.reject(new Error('clipboard unavailable'));
    }

    function revealPath(path) {
      return request(API + '/open-profile', { path: path }).then(() => null);
    }

    function shortPath(value) {
      var text = typeof value === 'string' ? value.trim() : '';
      if (!text) return '';
      var home = /^\/Users\/[^/]+/;
      if (home.test(text)) text = text.replace(home, '~');
      var parts = text.split('/');
      if (text.length > 38 && parts.length > 3) text = '…/' + parts.slice(-2).join('/');
      return text;
    }

    function sessionItem(ctx, lang, entry) {
      var t = copy(lang);
      var id = entry.sessionId;
      var title = entry.title || t.untitled;
      var run = () => {
        ctx.uiWorkspace.openSession(id);
        return undefined;
      };
      var actions = () => sessionActions(ctx, lang, entry);
      return item('session:' + id, 'session', title, entry.snippet || shortPath(entry.cwd), run, actions);
    }

    function renameOf(ctx, id, title) {
      var ref = ctx.sessions.retain(id, { source: 'controllerOperation' });
      var finish = () => {
        try {
          ref.release();
        } catch {
          /* already released */
        }
      };
      return Promise.resolve(ref.ready).then(
        (binding) =>
          Promise.resolve(binding.session.rename(title)).then(
            (result) => {
              finish();
              if (!result || result.ok === false) throw new Error('rename rejected');
              try {
                ctx.sessions.refreshProjections(id);
              } catch {
                /* projection refresh is best-effort */
              }
              return result.value;
            },
            (error) => {
              finish();
              throw error;
            },
          ),
        (error) => {
          finish();
          throw error;
        },
      );
    }

    function sessionActions(ctx, lang, entry) {
      var t = copy(lang);
      var id = entry.sessionId;
      var cwd = entry.cwd || '';
      return [
        item('action:open', 'action', t.sessionOpen, t.sessionOpenHint, () => {
          ctx.uiWorkspace.openSession(id);
          return undefined;
        }),
        item('action:rename', 'action', t.rename, t.renameHint, () => ({
          input: {
            kind: 'rename',
            title: t.renamePrompt,
            value: entry.title || '',
            submit: (value) =>
              renameOf(ctx, id, value.trim()).then(
                () => ({ status: t.done }),
                (error) => {
                  throw error;
                },
              ),
          },
        })),
        item('action:fork', 'action', t.fork, t.forkHint, () =>
          Promise.resolve(ctx.uiWorkspace.forkSession(id)).then((childId) => {
            if (childId) ctx.uiWorkspace.openSession(childId);
            return { status: t.done };
          }),
        ),
        item('action:archive', 'action', t.archive, t.archiveHint, () =>
          Promise.resolve(ctx.uiWorkspace.archiveSession(id, { stopActivity: true })).then(() => ({
            status: t.done,
          })),
        ),
        item('action:copy-id', 'action', t.copyId, id, () =>
          copyText(id).then(() => ({ status: t.copied })),
        ),
        item('action:copy-cwd', 'action', t.copyPath, shortPath(cwd), () =>
          copyText(cwd).then(() => ({ status: t.copied })),
        ),
        item('action:reveal', 'action', t.revealPath, shortPath(cwd), () =>
          revealPath(cwd).then(() => ({ status: t.done })),
        ),
        item('action:export', 'action', t.exportMd, t.exportMdHint, () =>
          getJson(API + '/export?id=' + encodeURIComponent(id)).then((payload) => {
            var blob = new Blob([payload.markdown], { type: 'text/markdown;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = payload.filename || 'session.md';
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            setTimeout(() => URL.revokeObjectURL(url), 4000);
            return { status: t.done };
          }),
        ),
      ];
    }

    function workspaceActions(ctx, lang, workspace) {
      var t = copy(lang);
      var id = workspace.workspaceId;
      var path = workspace.path || '';
      return [
        item('action:ws-open', 'action', t.wsOpen, shortPath(path), () =>
          Promise.resolve(ctx.uiWorkspace.openWorkspace(id)).then(() => undefined),
        ),
        item('action:ws-new', 'action', t.wsNew, shortPath(path), () => {
          ctx.uiWorkspace.startSession(id);
          return undefined;
        }),
        item('action:ws-copy', 'action', t.wsCopyPath, shortPath(path), () =>
          copyText(path).then(() => ({ status: t.copied })),
        ),
        item('action:ws-reveal', 'action', t.wsReveal, shortPath(path), () =>
          revealPath(path).then(() => ({ status: t.done })),
        ),
      ];
    }

    function buildActions(ctx, lang) {
      var t = copy(lang);
      var list = [
        item('cmd:new', 'action', t.newSession, t.newSessionHint, () => {
          ctx.uiWorkspace.startSession();
          return undefined;
        }),
        item('cmd:profile', 'action', t.openProfile, t.openProfileHint, () =>
          request(API + '/open-profile', {}).then(() => ({ status: t.done })),
        ),
        item('cmd:sessions', 'action', t.openSessions, t.openSessionsHint, () =>
          getJson(API + '/info').then((info) => revealPath(info.home + '/sessions')).then(() => ({
            status: t.done,
          })),
        ),
        item('cmd:logs', 'action', t.openLogs, t.openLogsHint, () =>
          getJson(API + '/info').then((info) => revealPath(info.home + '/logs')).then(() => ({
            status: t.done,
          })),
        ),
        item('cmd:reload', 'action', t.reload, t.reloadHint, () => {
          window.location.reload();
          return undefined;
        }),
      ];
      return list;
    }

    function buildThemes(ctx, lang) {
      var t = copy(lang);
      return ['light', 'dark', 'system'].map((id) =>
        item(
          'theme:' + id,
          'theme',
          id === 'light' ? t.themeLight : id === 'dark' ? t.themeDark : t.themeSystem,
          '',
          () => {
            ctx.theme.setTheme(id);
            return { status: t.done };
          },
        ),
      );
    }

    function buildLanguages(ctx, lang) {
      var t = copy(lang);
      var locales = [];
      try {
        var snapshot = ctx.locale.getLocale();
        locales = (snapshot && snapshot.locales) || [];
      } catch {
        locales = [];
      }
      var installed = [];
      for (var i = 0; i < locales.length; i++) {
        var raw = locales[i];
        var id = raw && typeof raw === 'object' ? raw.id : raw;
        var label = raw && typeof raw === 'object' ? raw.label || raw.id : raw;
        if (!id || id === 'en' || id === 'zh') continue;
        installed.push(
          item('lang:' + id, 'system', label, id, () => {
            ctx.locale.setLocale(id);
            return { status: t.done };
          }),
        );
      }
      return installed.concat([
          item('lang:zh', 'system', t.langZh, 'zh', () => {
            ctx.locale.setLocale('zh');
            return { status: t.done };
          }),
          item('lang:en', 'system', t.langEn, 'en', () => {
            ctx.locale.setLocale('en');
            return { status: t.done };
          }),
        ]);
    }

    function workspaceItem(ctx, lang, workspace) {
      var path = workspace.path || '';
      return item(
        'workspace:' + workspace.workspaceId,
        'workspace',
        (workspace.title || path || '').trim(),
        shortPath(path),
        () => Promise.resolve(ctx.uiWorkspace.openWorkspace(workspace.workspaceId)).then(() => undefined),
        () => workspaceActions(ctx, lang, workspace),
      );
    }

    function pluginItem(ctx, lang, plugin, reload) {
      var t = copy(lang);
      var key = 'plugin:' + plugin.name;
      var toggle = () => {
        var next = !plugin.enabled;
        return request(API + '/plugin', { name: plugin.name, enabled: next }).then((payload) => {
          if (reload) reload();
          var status = next ? t.pluginOn : t.pluginOff;
          var suffix = payload && payload.application === 'restart-required' ? ' · ' + t.restartHint : '';
          return { status: plugin.name + ' · ' + status + suffix };
        });
      };
      var actions = () => [
        item(key + ':toggle', 'action', plugin.enabled ? t.disablePlugin : t.enablePlugin, plugin.name, toggle, null),
        item(key + ':dir', 'action', t.pluginDir, plugin.name, () => revealPath(plugin.dir), null),
      ];
      var sub = [plugin.version ? 'v' + plugin.version : '', plugin.enabled ? t.pluginOn : t.pluginOff]
        .filter(Boolean)
        .join(' · ');
      var row = item(key, 'plugin', plugin.name, sub, toggle, actions);
      row.dot = plugin.enabled ? C.ok : C.sub;
      return row;
    }

    function extItem(ctx, lang, command) {
      var key = 'ext:' + command.id;
      return item(
        key,
        'ext',
        command.title,
        command.sub || '',
        () => {
          var out = command.run(ctx);
          if (out && typeof out.then === 'function') {
            return out.then((value) => (value && value.status ? { status: value.status } : null));
          }
          return out && out.status ? { status: out.status } : null;
        },
        null,
      );
    }

    // ---------------------------------------------------------------------
    // root list
    // ---------------------------------------------------------------------
    var GROUP_ORDER = ['recent', 'session', 'plugin', 'action', 'workspace', 'theme', 'system', 'ext'];

    function groupLabel(group, lang) {
      var t = copy(lang);
      if (group === 'session') return t.session;
      if (group === 'workspace') return t.workspace;
      if (group === 'action') return t.action;
      if (group === 'theme') return t.theme;
      if (group === 'system') return t.system;
      if (group === 'plugin') return t.plugin;
      if (group === 'ext') return t.ext;
      return t.recent;
    }

    function buildRoot(ctx, lang, query, catalog, workspaces, recent, plugins, ext, reloadPlugins) {
      var items = [];
      // keep the verbs reachable: a long transcript list would push them away
      catalog.slice(0, query.trim() ? catalog.length : 5).forEach((entry) => items.push(sessionItem(ctx, lang, entry)));
      (plugins || []).slice(0, query.trim() ? plugins.length : 6).forEach((plugin) => items.push(pluginItem(ctx, lang, plugin, reloadPlugins)));
      buildActions(ctx, lang).forEach((entry) => items.push(entry));
      workspaces.forEach((workspace) => items.push(workspaceItem(ctx, lang, workspace)));
      (ext || []).forEach((command) => items.push(extItem(ctx, lang, command)));
      buildThemes(ctx, lang).forEach((entry) => items.push(entry));
      buildLanguages(ctx, lang).forEach((entry) => items.push(entry));

      if (!query.trim()) {
        // a short "recent" band on top, then the natural groups
        var ranked = items
          .map((entry) => ({ entry: entry, hit: recent[entry.key] }))
          .filter((row) => row.hit && row.hit.at)
          .sort((a, b) => (b.hit.at || 0) - (a.hit.at || 0))
          .slice(0, 4)
          .map((row) => row.entry);
        var seen = new Set(ranked.map((entry) => entry.key));
        return ranked
          .map((entry) => Object.assign({}, entry, { group: 'recent' }))
          .concat(items.filter((entry) => !seen.has(entry.key)));
      }

      var scored = [];
      items.forEach((entry) => {
        var score = scoreOf(query, entry);
        if (!entry.key.startsWith('session:')) {
          // the Host already filtered sessions; local items need their own match
          if (score <= 0) return;
        }
        var bump = recent[entry.key] && recent[entry.key].at ? Math.min(recent[entry.key].count || 0, 6) * 0.02 : 0;
        scored.push({ entry: entry, score: score + bump });
      });
      // keep every group contiguous: a group's place comes from its best hit, the
      // rows inside keep their own order. Otherwise one group shows up twice.
      var best = {};
      scored.forEach((row) => {
        var key = row.entry.group;
        if (!(key in best) || row.score > best[key]) best[key] = row.score;
      });
      scored.sort((a, b) => {
        var ga = a.entry.group;
        var gb = b.entry.group;
        if (ga !== gb) {
          if (best[gb] !== best[ga]) return best[gb] - best[ga];
          return GROUP_ORDER.indexOf(ga) - GROUP_ORDER.indexOf(gb);
        }
        return b.score - a.score;
      });
      return scored.map((row) => row.entry);
    }

    // ---------------------------------------------------------------------
    // visual helpers
    // ---------------------------------------------------------------------
    function mix(color, percent, over) {
      return 'color-mix(in srgb, ' + color + ' ' + percent + '%, ' + (over || 'transparent') + ')';
    }

    var ICONS = {
      search: [
        ['circle', { cx: 11, cy: 11, r: 7 }],
        ['path', { d: 'm20 20-3.2-3.2' }],
      ],
      session: [['path', { d: 'M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }]],
      workspace: [['path', { d: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }]],
      plugin: [
        ['path', { d: 'M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z' }],
        ['path', { d: 'm3.3 7 8.7 5 8.7-5' }],
        ['path', { d: 'M12 22V12' }],
      ],
      action: [['path', { d: 'M13 2 4 14h7l-1 8 9-12h-7z' }]],
      theme: [
        ['circle', { cx: 12, cy: 12, r: 4 }],
        ['path', { d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' }],
      ],
      system: [
        ['path', { d: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3' }],
        ['path', { d: 'M1 14h6M9 8h6M17 16h6' }],
      ],
      recent: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['path', { d: 'M12 7v5l3 2' }],
      ],
      ext: [['path', { d: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z' }]],
      more: [
        ['circle', { cx: 5, cy: 12, r: 1.4 }],
        ['circle', { cx: 12, cy: 12, r: 1.4 }],
        ['circle', { cx: 19, cy: 12, r: 1.4 }],
      ],
      back: [['path', { d: 'm15 18-6-6 6-6' }]],
      'arrow-up-right': [['path', { d: 'M7 17 17 7M8 7h9v9' }]],
      external: [['path', { d: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }]],
      pencil: [
        ['path', { d: 'M12 20h9' }],
        ['path', { d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z' }],
      ],
      branch: [
        ['circle', { cx: 6, cy: 6, r: 2.5 }],
        ['circle', { cx: 6, cy: 18, r: 2.5 }],
        ['circle', { cx: 18, cy: 6, r: 2.5 }],
        ['path', { d: 'M6 8.5v7M18 8.5c0 3-2 4-5 4H8' }],
      ],
      archive: [
        ['rect', { x: 3, y: 4, width: 18, height: 4, rx: 1 }],
        ['path', { d: 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4' }],
      ],
      copy: [
        ['rect', { x: 9, y: 9, width: 11, height: 11, rx: 2 }],
        ['path', { d: 'M5 15V5a2 2 0 0 1 2-2h10' }],
      ],
      folder: [['path', { d: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }]],
      download: [['path', { d: 'M12 3v12M7 10l5 5 5-5M5 21h14' }]],
      power: [
        ['path', { d: 'M12 3v9' }],
        ['path', { d: 'M7 6.5a7 7 0 1 0 10 0' }],
      ],
      plus: [['path', { d: 'M12 5v14M5 12h14' }]],
      refresh: [
        ['path', { d: 'M20 11a8 8 0 1 0-2.3 5.7' }],
        ['path', { d: 'M20 4v7h-7' }],
      ],
      globe: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['path', { d: 'M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z' }],
      ],
      check: [['path', { d: 'm20 6-11 11-5-5' }]],
      x: [['path', { d: 'M18 6 6 18M6 6l12 12' }]],
    };

    function Icon(props) {
      var paint = ICONS[props.name] || ICONS.action;
      var size = props.size || 16;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: props.stroke || 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
          style: { display: 'block', flex: '0 0 auto' },
        },
        paint.map(function (entry, position) {
          return h(entry[0], Object.assign({ key: position }, entry[1]));
        }),
      );
    }

    function iconForGroup(group) {
      if (group === 'recent') return 'recent';
      if (group === 'session') return 'session';
      if (group === 'workspace') return 'workspace';
      if (group === 'plugin') return 'plugin';
      if (group === 'theme') return 'theme';
      if (group === 'system') return 'system';
      if (group === 'ext') return 'ext';
      return 'action';
    }

    function iconForEntry(entry) {
      if (!entry) return 'action';
      var key = String(entry.key || '');
      if (/:toggle$/.test(key)) return 'power';
      if (/:dir$/.test(key)) return 'folder';
      if (key.indexOf('theme:') === 0) return 'theme';
      if (key.indexOf('lang:') === 0) return 'globe';
      if (key.indexOf('plugin:') === 0) return 'plugin';
      if (key.indexOf('workspace:') === 0) return 'workspace';
      if (key.indexOf('session:') === 0) return 'session';
      if (key.indexOf('ext:') === 0) return 'ext';
      if (key.indexOf('cmd:reload') === 0) return 'refresh';
      if (key.indexOf('cmd:new') === 0) return 'plus';
      if (key.indexOf('cmd:profile') === 0) return 'folder';
      if (key.indexOf('cmd:sessions') === 0) return 'folder';
      if (key.indexOf('cmd:logs') === 0) return 'folder';
      if (key.indexOf('action:rename') === 0) return 'pencil';
      if (key.indexOf('action:fork') === 0) return 'branch';
      if (key.indexOf('action:archive') === 0) return 'archive';
      if (key.indexOf('action:copy') === 0) return 'copy';
      if (key.indexOf('action:ws-copy') === 0) return 'copy';
      if (key.indexOf('action:reveal') === 0) return 'external';
      if (key.indexOf('action:ws-reveal') === 0) return 'external';
      if (key.indexOf('action:export') === 0) return 'download';
      if (key.indexOf('action:ws-new') === 0) return 'plus';
      if (key.indexOf('action:open') === 0) return 'arrow-up-right';
      if (key.indexOf('action:ws-open') === 0) return 'arrow-up-right';
      return iconForGroup(entry.group);
    }

    function Kbd(props) {
      return h(
        'span',
        {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 20,
            height: 20,
            padding: '0 5px',
            boxSizing: 'border-box',
            flex: '0 0 auto',
            fontFamily: MONO,
            fontSize: 10.5,
            fontWeight: 600,
            lineHeight: 1,
            color: C.sub,
            background: mix(C.layerAlt, 72),
            border: '1px solid ' + mix(C.lineStrong, 65),
            borderBottomColor: mix(C.lineStrong, 88),
            borderRadius: 5,
            boxShadow: '0 1px 0 ' + mix(C.text, 5),
            whiteSpace: 'nowrap',
          },
        },
        props.children,
      );
    }

    function IconTile(props) {
      var active = props.active;
      return h(
        'span',
        {
          style: {
            position: 'relative',
            flex: '0 0 auto',
            width: 30,
            height: 30,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            color: active ? C.brand : C.sub,
            background: active ? mix(C.brand, 13) : mix(C.layerAlt, 76),
            border: '1px solid ' + (active ? mix(C.brand, 24) : mix(C.line, 70)),
            transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
          },
        },
        h(Icon, { name: props.name, size: 15 }),
        props.dot
          ? h('span', {
              style: {
                position: 'absolute',
                right: -1,
                bottom: -1,
                width: 7,
                height: 7,
                borderRadius: 4,
                background: props.dot,
                border: '2px solid ' + C.overlay,
                boxSizing: 'content-box',
              },
            })
          : null,
      );
    }

    var SHIMMER =
      'linear-gradient(90deg, ' +
      mix(C.layerAlt, 78) +
      ' 25%, ' +
      mix(C.lineStrong, 58) +
      ' 37%, ' +
      mix(C.layerAlt, 78) +
      ' 63%)';

    var PANEL_CSS = [
      '@keyframes dsh-cmdk-in{from{opacity:0;transform:translateY(-10px) scale(.985)}to{opacity:1;transform:none}}',
      '@keyframes dsh-cmdk-fade{from{opacity:0}}',
      '@keyframes dsh-cmdk-shimmer{0%{background-position:-240px 0}100%{background-position:240px 0}}',
      '@keyframes dsh-cmdk-spin{to{transform:rotate(360deg)}}',
      '.dsh-cmdk-input::placeholder{color:' + C.sub + ';opacity:.72}',
      '.dsh-cmdk-back:hover,.dsh-cmdk-more:hover{background:' + mix(C.layerAlt, 82) + '!important;color:' + C.text + '!important}',
      '.dsh-cmdk-clear:hover{color:' + C.text + '!important}',
      '.dsh-cmdk-scroll{scrollbar-width:thin;scrollbar-color:' + mix(C.sub, 30) + ' transparent}',
      '.dsh-cmdk-scroll::-webkit-scrollbar{width:10px;height:10px}',
      '.dsh-cmdk-scroll::-webkit-scrollbar-track{background:transparent}',
      '.dsh-cmdk-scroll::-webkit-scrollbar-thumb{background:' + mix(C.sub, 26) + ';border-radius:999px;border:3px solid transparent;background-clip:content-box}',
      '.dsh-cmdk-scroll::-webkit-scrollbar-thumb:hover{background:' + mix(C.sub, 44) + ';border:3px solid transparent;background-clip:content-box}',
      '@media (prefers-reduced-motion:reduce){.dsh-cmdk-panel,.dsh-cmdk-scrim{animation:none!important}.dsh-cmdk-panel *{transition:none!important}.dsh-cmdk-shimmer{animation:none!important}}',
    ].join('');

    function Hints(props) {
      return h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, overflow: 'hidden' } },
        props.items.map(function (pair, position) {
          return h(
            'span',
            {
              key: position,
              style: { display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' },
            },
            h(Kbd, null, pair[0]),
            pair[1],
          );
        }),
      );
    }

    function Highlight(props) {
      var text = props.text == null ? '' : String(props.text);
      var query = String(props.query || '').trim();
      if (!query) return text;
      var lower = text.toLowerCase();
      var needle = query.toLowerCase();
      var at = lower.indexOf(needle);
      if (at < 0) return text;
      var parts = [];
      var from = 0;
      var guard = 0;
      while (at >= 0 && guard < 40) {
        if (at > from) parts.push(text.slice(from, at));
        parts.push(
          h(
            'mark',
            {
              key: 'm' + parts.length,
              style: {
                backgroundColor: mix(C.brand, 22),
                boxShadow: 'inset 0 -1px 0 ' + mix(C.brand, 62),
                color: 'inherit',
                borderRadius: 3,
                padding: '0 1px',
                fontWeight: 600,
              },
            },
            text.slice(at, at + needle.length),
          ),
        );
        from = at + needle.length;
        at = lower.indexOf(needle, from);
        guard += 1;
      }
      if (from < text.length) parts.push(text.slice(from));
      return parts;
    }

    function EmptyState(props) {
      var query = String(props.query || '').trim();
      if (query.length > 30) query = query.slice(0, 30) + '…';
      return h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 9,
            padding: '54px 24px 60px',
          },
        },
        h(
          'span',
          {
            style: {
              width: 46,
              height: 46,
              borderRadius: 14,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: mix(C.layerAlt, 80),
              border: '1px solid ' + mix(C.lineStrong, 55),
              color: C.sub,
              marginBottom: 2,
            },
          },
          h(Icon, { name: 'search', size: 20 }),
        ),
        h(
          'div',
          {
            style: {
              fontSize: 13.5,
              fontWeight: 600,
              color: C.text,
              maxWidth: 380,
              lineHeight: 1.4,
              overflowWrap: 'anywhere',
            },
          },
          query ? props.t.emptyFor.replace('{q}', function () { return query; }) : props.t.emptyTitle,
        ),
        h(
          'div',
          { style: { fontSize: 12, color: C.sub, maxWidth: 300, lineHeight: 1.55 } },
          props.t.emptySub,
        ),
      );
    }

    function Skeleton() {
      return h(
        'div',
        { style: { padding: '8px 2px' } },
        [0, 1, 2, 3].map(function (row) {
          var shimmer = {
            background: SHIMMER,
            backgroundSize: '400px 100%',
            animation: 'dsh-cmdk-shimmer 1.3s linear infinite',
          };
          return h(
            'div',
            { key: row, style: { display: 'flex', alignItems: 'center', gap: 11, padding: '8px 10px' } },
            h('div', { style: Object.assign({ width: 30, height: 30, borderRadius: 8, flex: '0 0 auto' }, shimmer) }),
            h(
              'div',
              { style: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 } },
              h(
                'div',
                { style: Object.assign({ height: 10, width: 46 + ((row * 13) % 34) + '%', borderRadius: 4 }, shimmer) },
              ),
              h(
                'div',
                {
                  style: Object.assign(
                    { height: 8, width: 28 + ((row * 9) % 26) + '%', borderRadius: 4, opacity: 0.7 },
                    shimmer,
                  ),
                },
              ),
            ),
          );
        }),
      );
    }

    // ---------------------------------------------------------------------
    // the palette itself
    // ---------------------------------------------------------------------
    function Palette(props) {
      var ctx = props.ctx;
      var lang = useLang(ctx);
      var t = copy(lang);
      var open = useOpen();
      var [query, setQuery] = useState('');
      var [catalog, setCatalog] = useState({ items: [], loading: true });
      var [index, setIndex] = useState(0);
      var [stack, setStack] = useState([]);
      var [input, setInput] = useState(null);
      var [status, setStatus] = useState(null);
      var [busy, setBusy] = useState(false);
      var [focused, setFocused] = useState(false);
      var [canFade, setCanFade] = useState(false);
      var inputRef = useRef(null);
      var listRef = useRef(null);
      var [workspaces, setWorkspaces] = useState([]);
      var [archived, setArchived] = useState({});
      var [recent, setRecent] = useState(() => readRecent());
      var [plugins, setPlugins] = useState([]);
      var ext = useExtCommands();

      function reloadPlugins() {
        getJson(API + '/plugins')
          .then((payload) => setPlugins(Array.isArray(payload.items) ? payload.items : []))
          .catch(() => undefined);
      }

      var panelRef = useRef(null);
      var handlerRef = useRef(null);

      // After a mode change the text input unmounts, so focus falls back to the
      // body: pull it onto the panel and relay keys that escape our dialog.
      useEffect(() => {
        if (!open) return;
        var node = panelRef.current;
        if (node && document.activeElement !== node) {
          try {
            node.focus({ preventScroll: true });
          } catch (error) {
            node.focus();
          }
        }
      }, [open, stack.length, input]);

      useEffect(() => {
        if (!open) return undefined;
        function relay(event) {
          var node = panelRef.current;
          var target = event.target;
          if (node && target && target.nodeType && node.contains(target)) return;
          if (handlerRef.current) handlerRef.current(event);
        }
        window.addEventListener('keydown', relay, true);
        return () => window.removeEventListener('keydown', relay, true);
      }, [open]);

      handlerRef.current = onKeyDown;

      // workspaces + archived ids come from the Host store mirror
      useEffect(() => {
        if (!open) return undefined;
        reloadPlugins();
        return undefined;
      }, [open]);

      useEffect(() => {
        if (!open) return undefined;
        var alive = true;
        getJson(API + '/workspaces')
          .then((payload) => {
            if (!alive) return;
            setWorkspaces(Array.isArray(payload.items) ? payload.items : []);
            var map = {};
            (payload.archived || []).forEach((id) => {
              map[id] = true;
            });
            setArchived(map);
          })
          .catch(() => {
            /* the palette still works without the workspace list */
          });
        return () => {
          alive = false;
        };
      }, [open]);

      // session catalogue comes from the Host: titles + content hits
      useEffect(() => {
        if (!open) return undefined;
        var alive = true;
        var text = query.trim();
        setStatus(null);
        var timer = setTimeout(
          () => {
            setCatalog((prev) => (prev.items.length ? prev : { items: [], loading: true }));
            getJson(API + '/sessions?limit=24' + (text ? '&q=' + encodeURIComponent(text) : ''))
              .then((payload) => {
                if (!alive) return;
                var live = (payload.items || []).filter((entry) => !archived[entry.sessionId]);
                setCatalog({ items: live, loading: false });
              })
              .catch(() => {
                if (!alive) return;
                setCatalog({ items: [], loading: false });
              });
          },
          text ? 180 : 0,
        );
        return () => {
          alive = false;
          clearTimeout(timer);
        };
      }, [open, query]);

      useEffect(() => {
        if (!open) {
          setQuery('');
          setIndex(0);
          setStack([]);
          setInput(null);
          setStatus(null);
          return;
        }
        setRecent(readRecent());
        var handle = setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
            inputRef.current.select && inputRef.current.select();
          }
        }, 30);
        return () => clearTimeout(handle);
      }, [open]);

      useEffect(() => {
        if (!open) return undefined;
        var handle = setTimeout(() => {
          var node = inputRef.current;
          if (node && typeof node.focus === 'function') node.focus({ preventScroll: true });
        }, 20);
        return () => clearTimeout(handle);
      }, [open, stack.length, input]);

      useEffect(() => {
        if (!status) return undefined;
        var handle = setTimeout(() => setStatus(null), 2200);
        return () => clearTimeout(handle);
      }, [status]);

      var visible = [];
      for (var vi = 0; vi < catalog.items.length; vi += 1) {
        if (!archived[catalog.items[vi].sessionId]) visible.push(catalog.items[vi]);
      }
      var root = buildRoot(ctx, lang, query, visible, workspaces, recent, plugins, ext, reloadPlugins);
      var current = stack.length ? stack[stack.length - 1] : null;
      var items = input ? [] : current ? current.items : root;
      var active = Math.min(index, Math.max(items.length - 1, 0));

      function close() {
        setFocused(false);
        store.set(false);
      }

      function goBack() {
        if (input) {
          setInput(null);
          return;
        }
        if (stack.length) {
          setStack((prev) => prev.slice(0, -1));
          setIndex(0);
        }
      }

      function syncScrollFade() {
        var node = listRef.current;
        if (!node) return;
        setCanFade(node.scrollHeight - node.scrollTop - node.clientHeight > 4);
      }

      // Keep the highlighted row inside the viewport when the keyboard moves it.
      useEffect(() => {
        if (!open) return;
        var node = listRef.current;
        if (!node) return;
        var option = node.querySelector('#dsh-cmdk-opt-' + active);
        if (option && typeof option.scrollIntoView === 'function') {
          option.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
        }
      }, [open, active, stack.length, input, items.length]);

      useEffect(() => {
        syncScrollFade();
      }, [open, items.length, query, stack.length, input, catalog.loading]);

      function remember(key) {
        var next = bumpRecent(key);
        if (next) setRecent(next);
      }

      function settle(result) {
        if (!result) {
          close();
          return;
        }
        if (result.input) {
          setInput({ title: result.input.title, value: result.input.value || '', submit: result.input.submit });
          setStatus(null);
          return;
        }
        if (result.status) {
          setStatus(result.status);
          // keep the palette open so the toast is visible, but leave action mode
          setStack([]);
          return;
        }
        close();
      }

      function run(entry) {
        if (!entry || busy) return;
        remember(entry.key);
        var result;
        try {
          result = entry.run();
        } catch (error) {
          setStatus(t.failed + '：' + String((error && error.message) || error));
          return;
        }
        if (result && typeof result.then === 'function') {
          setBusy(true);
          result.then(
            (value) => {
              setBusy(false);
              settle(value);
            },
            (error) => {
              setBusy(false);
              setStatus(t.failed + '：' + String((error && error.message) || error));
            },
          );
          return;
        }
        settle(result);
      }

      function openActions(entry) {
        if (!entry || !entry.actions) return false;
        setStack((prev) => prev.concat([{ title: entry.title, group: entry.group, items: entry.actions() }]));
        setIndex(0);
        return true;
      }

      function submitInput() {
        if (!input) return;
        var value = String(input.value || '').trim();
        if (!value) {
          setStatus(t.cancelled);
          setInput(null);
          return;
        }
        var pending;
        try {
          pending = input.submit(value);
        } catch (error) {
          setStatus(t.failed + '：' + String((error && error.message) || error));
          return;
        }
        setBusy(true);
        Promise.resolve(pending).then(
          (result) => {
            setBusy(false);
            setInput(null);
            settle(result || { status: t.done });
          },
          (error) => {
            setBusy(false);
            setStatus(t.failed + '：' + String((error && error.message) || error));
          },
        );
      }

      function onKeyDown(event) {
        if (event.isComposing || (event.nativeEvent && event.nativeEvent.isComposing) || event.keyCode === 229) {
          return;
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          if (input) {
            setInput(null);
            return;
          }
          if (stack.length) {
            setStack((prev) => prev.slice(0, -1));
            setIndex(0);
            return;
          }
          close();
          return;
        }
        if (input) {
          if (event.key === 'Enter') {
            event.preventDefault();
            submitInput();
          }
          return;
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (items.length) setIndex((active + 1) % items.length);
          return;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (items.length) setIndex((active - 1 + items.length) % items.length);
          return;
        }
        if (event.key === 'ArrowRight' || event.key === 'Tab') {
          if (openActions(items[active])) {
            event.preventDefault();
            return;
          }
          if (event.key === 'Tab') event.preventDefault();
          return;
        }
        if (event.key === 'ArrowLeft' && stack.length) {
          event.preventDefault();
          setStack((prev) => prev.slice(0, -1));
          setIndex(0);
          return;
        }
        if (event.key === 'Enter') {
          event.preventDefault();
          run(items[active]);
          return;
        }
        if (event.key === 'Backspace' && !query && stack.length) {
          event.preventDefault();
          setStack((prev) => prev.slice(0, -1));
          setIndex(0);
        }
      }

      if (!open) return null;

      var sections = [];
      var lastGroup = null;
      var counts = {};
      items.forEach((entry) => {
        counts[entry.group] = (counts[entry.group] || 0) + 1;
      });
      items.forEach((entry, position) => {
        if (entry.group !== lastGroup) {
          lastGroup = entry.group;
          sections.push({
            key: 'group:' + entry.group + ':' + position,
            group: entry.group,
            rows: [],
          });
        }
        sections[sections.length - 1].rows.push(
          renderRow(
            entry,
            position === active,
            () => run(entry),
            () => openActions(entry),
            () => setIndex(position),
            position,
            t.hintActions,
            stack.length ? '' : query,
          ),
        );
      });
      var rows = sections.map(function (section) {
        return h(
          'div',
          {
            key: section.key,
            role: 'group',
            'aria-label': groupLabel(section.group, lang),
          },
          h(
            'div',
            {
              style: {
                position: 'sticky',
                top: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '11px 10px 5px',
                background: C.overlay,
              },
            },
            h(
              'span',
              {
                style: {
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '.09em',
                  textTransform: 'uppercase',
                  color: C.sub,
                },
              },
              groupLabel(section.group, lang),
            ),
            h(
              'span',
              {
                style: {
                  fontSize: 10.5,
                  fontVariantNumeric: 'tabular-nums',
                  color: mix(C.sub, 72),
                },
              },
              counts[section.group],
            ),
          ),
          section.rows,
        );
      });

      var headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '12px 14px',
        borderBottom: '1px solid ' + mix(C.lineStrong, 55),
        position: 'relative',
        zIndex: 2,
        background: mix(C.overlay, 70),
      };
      var fieldStyle = {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        height: 42,
        padding: '0 11px',
        boxSizing: 'border-box',
        borderRadius: 10,
        background: mix(C.base, 66),
        border: '1px solid ' + (focused ? mix(C.brand, 55) : mix(C.lineStrong, 62)),
        boxShadow: focused
          ? '0 0 0 3px ' + mix(C.brand, 14) + ', inset 0 1px 2px ' + mix(C.text, 5)
          : 'inset 0 1px 2px ' + mix(C.text, 4),
        transition: 'border-color 140ms ease, box-shadow 140ms ease',
      };
      var inputStyle = {
        flex: 1,
        minWidth: 0,
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: C.text,
        fontSize: 15,
        fontFamily: 'inherit',
        caretColor: C.brand,
      };
      var backButton = h(
        'button',
        {
          type: 'button',
          className: 'dsh-cmdk-back',
          title: t.hintBack,
          'aria-label': t.hintBack,
          onClick: goBack,
          style: {
            flex: '0 0 auto',
            width: 28,
            height: 28,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            border: 'none',
            borderRadius: 8,
            background: 'transparent',
            color: C.sub,
            cursor: 'pointer',
            transition: 'background 120ms ease, color 120ms ease',
          },
        },
        h(Icon, { name: 'back', size: 16 }),
      );

      var header;
      if (input) {
        header = h(
          'div',
          { style: headerStyle },
          backButton,
          h(
            'div',
            { style: fieldStyle },
            h(Icon, { name: 'pencil', size: 16 }),
            h('input', {
              ref: inputRef,
              value: input.value,
              placeholder: input.title,
              className: 'dsh-cmdk-input',
              onChange: (event) => setInput(Object.assign({}, input, { value: event.target.value })),
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
              style: inputStyle,
              'aria-label': input.title,
              spellCheck: false,
              autoComplete: 'off',
            }),
          ),
          h(Kbd, null, '↵'),
          h(Kbd, null, 'esc'),
        );
      } else if (current) {
        header = h(
          'div',
          { style: headerStyle },
          backButton,
          h(
            'div',
            { style: { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 } },
            h(IconTile, { name: iconForGroup(current.group || 'action'), active: true }),
            h(
              'span',
              {
                style: {
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: '-.005em',
                },
              },
              current.title,
            ),
          ),
          h(Kbd, null, 'esc'),
        );
      } else {
        header = h(
          'div',
          { style: headerStyle },
          h(
            'div',
            { style: fieldStyle },
            h(Icon, { name: 'search', size: 17 }),
            h('input', {
              ref: inputRef,
              value: query,
              placeholder: t.placeholder,
              className: 'dsh-cmdk-input',
              onChange: (event) => {
                setQuery(event.target.value);
                setIndex(0);
              },
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
              style: inputStyle,
              'aria-label': t.placeholder,
              'aria-controls': 'dsh-cmdk-list',
              'aria-activedescendant': items.length ? 'dsh-cmdk-opt-' + active : undefined,
              spellCheck: false,
              autoComplete: 'off',
            }),
            query
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-cmdk-clear',
                    'aria-label': t.clear,
                    onClick: () => {
                      setQuery('');
                      setIndex(0);
                      if (inputRef.current) inputRef.current.focus({ preventScroll: true });
                    },
                    style: {
                      flex: '0 0 auto',
                      width: 22,
                      height: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      border: 'none',
                      borderRadius: 6,
                      background: 'transparent',
                      color: C.sub,
                      cursor: 'pointer',
                      transition: 'color 120ms ease',
                    },
                  },
                  h(Icon, { name: 'x', size: 14 }),
                )
              : null,
          ),
          h(Kbd, null, 'esc'),
        );
      }

      var statusKind = status && status.indexOf(t.failed) === 0 ? 'err' : 'ok';
      var footerLeft;
      if (status) {
        footerLeft = h(
          'span',
          {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              minWidth: 0,
              overflow: 'hidden',
              color: statusKind === 'err' ? C.err : C.ok,
              fontWeight: 500,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
          h('span', {
            style: {
              flex: '0 0 auto',
              width: 6,
              height: 6,
              borderRadius: 3,
              background: 'currentColor',
            },
          }),
          status,
        );
      } else if (busy) {
        footerLeft = h(
          'span',
          {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: C.brand,
            },
          },
          h('span', {
            style: {
              width: 11,
              height: 11,
              borderRadius: 6,
              border: '1.6px solid ' + mix(C.brand, 35),
              borderTopColor: C.brand,
              animation: 'dsh-cmdk-spin .7s linear infinite',
            },
          }),
          t.searching,
        );
      } else {
        var hints;
        if (!items.length) {
          hints = [['esc', t.hintClose]];
        } else if (current) {
          hints = [
            ['↵', t.hintRun],
            ['←', t.hintBack],
            ['esc', t.hintClose],
          ];
        } else {
          hints = [
            ['↑↓', t.hintSelect],
            ['↵', t.hintOpen],
            ['→', t.hintActions],
            ['esc', t.hintClose],
          ];
        }
        footerLeft = h(Hints, { items: hints });
      }

      var tree = h(
        'div',
        {
          className: 'dsh-cmdk-scrim',
          style: {
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 'clamp(48px, 12vh, 120px) 20px 20px',
            boxSizing: 'border-box',
            background: 'color-mix(in srgb, #000 36%, transparent)',
            animation: 'dsh-cmdk-fade 140ms ease-out',
          },
          onMouseDown: (event) => {
            if (event.target === event.currentTarget) close();
          },
        },
        h(
          'div',
          {
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t.palette,
            className: 'dsh-cmdk-panel',
            ref: panelRef,
            tabIndex: -1,
            onKeyDown: onKeyDown,
            style: {
              position: 'relative',
              width: 'min(680px, calc(100vw - 40px))',
              maxHeight: 'min(72vh, 720px)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              background: C.overlay,
              color: C.text,
              border: '1px solid ' + mix(C.lineStrong, 72),
              borderRadius: 16,
              boxShadow:
                '0 0 0 1px ' +
                mix(C.text, 4) +
                ' inset, 0 32px 80px -18px rgba(0,0,0,.6), 0 12px 28px -14px rgba(0,0,0,.45)',
              overflow: 'hidden',
              outline: 'none',
              fontFamily: 'inherit',
              animation: 'dsh-cmdk-in 180ms cubic-bezier(.16,1,.3,1)',
            },
          },
          h('style', null, PANEL_CSS),
          h('div', {
            'aria-hidden': 'true',
            style: {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 110,
              pointerEvents: 'none',
              background:
                'radial-gradient(120% 100% at 50% -30%, ' + mix(C.brand, 12) + ', transparent 72%)',
            },
          }),
          h('div', {
            'aria-hidden': 'true',
            style: {
              position: 'absolute',
              top: 0,
              left: '12%',
              right: '12%',
              height: 1,
              zIndex: 3,
              pointerEvents: 'none',
              background:
                'linear-gradient(90deg, transparent, ' + mix(C.brand, 55) + ', transparent)',
            },
          }),
          header,
          h(
            'div',
            {
              id: 'dsh-cmdk-list',
              role: 'listbox',
              'aria-label': input ? input.title : t.resultsLabel,
              className: 'dsh-cmdk-scroll',
              ref: listRef,
              onScroll: syncScrollFade,
              style: {
                overflowY: 'auto',
                flex: 1,
                minHeight: 0,
                padding: '4px 8px 10px',
                WebkitMaskImage: canFade
                  ? 'linear-gradient(to bottom, #000 calc(100% - 26px), transparent)'
                  : undefined,
                maskImage: canFade
                  ? 'linear-gradient(to bottom, #000 calc(100% - 26px), transparent)'
                  : undefined,
              },
            },
            input
              ? null
              : items.length
                ? rows
                : catalog.loading
                  ? h(Skeleton)
                  : h(EmptyState, { t: t, query: query }),
          ),
          h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '8px 14px',
                borderTop: '1px solid ' + mix(C.lineStrong, 50),
                background: mix(C.layerAlt, 34),
                fontSize: 11,
                color: C.sub,
                minHeight: 37,
                boxSizing: 'border-box',
              },
            },
            h(
              'span',
              {
                role: 'status',
                'aria-live': 'polite',
                'aria-atomic': 'true',
                style: {
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                },
              },
              !input && query && !catalog.loading ? items.length + ' ' + t.results : '',
            ),
            footerLeft,
            h(
              'span',
              {
                style: {
                  flex: '0 0 auto',
                  fontFamily: MONO,
                  fontSize: 10.5,
                  fontVariantNumeric: 'tabular-nums',
                  color: mix(C.sub, 80),
                },
              },
              items.length ? active + 1 + ' / ' + items.length : '',
            ),
          ),
        ),
      );
      return tree;
    }

    function renderRow(entry, active, onRun, onActions, onHover, position, moreLabel, query) {
      return h(
        'div',
        {
          key: entry.key,
          id: 'dsh-cmdk-opt-' + position,
          role: 'option',
          'aria-selected': active ? 'true' : 'false',
          onClick: onRun,
          onMouseEnter: onHover,
          onDoubleClick: onActions,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            margin: '1px 0',
            padding: '7px 10px',
            borderRadius: 10,
            cursor: 'pointer',
            scrollMarginTop: 30,
            scrollMarginBottom: 30,
            background: active ? mix(C.brand, 11, C.layerAlt) : 'transparent',
            boxShadow: active ? 'inset 0 0 0 1px ' + mix(C.brand, 20) : 'none',
            transition: 'background 110ms ease, box-shadow 110ms ease',
            outline: 'none',
          },
        },
        h(IconTile, { name: iconForEntry(entry), active: active, dot: entry.dot }),
        h(
          'div',
          { style: { minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 } },
          h(
            'div',
            {
              style: {
                fontSize: 13.5,
                fontWeight: 500,
                color: C.text,
                letterSpacing: '-.005em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            },
            h(Highlight, { text: entry.title, query: query }),
          ),
          entry.sub
            ? h(
                'div',
                {
                  style: {
                    fontSize: 11.5,
                    color: C.sub,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                },
                h(Highlight, { text: entry.sub, query: query }),
              )
            : null,
        ),
        active ? h(Kbd, null, '↵') : null,
        entry.actions
          ? h(
              'button',
              {
                type: 'button',
                className: 'dsh-cmdk-more',
                title: moreLabel,
                'aria-label': moreLabel,
                tabIndex: -1,
                onClick: (event) => {
                  event.stopPropagation();
                  onActions();
                },
                style: {
                  flex: '0 0 auto',
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  border: 'none',
                  borderRadius: 6,
                  background: 'transparent',
                  color: C.sub,
                  cursor: 'pointer',
                  opacity: active ? 0.95 : 0.45,
                  transition: 'opacity 120ms ease, background 120ms ease, color 120ms ease',
                },
              },
              h(Icon, { name: 'more', size: 15 }),
            )
          : null,
      );
    }

    function FooterButton(props) {
      var lang = useLang(props.ctx);
      var t = copy(lang);
      var [hover, setHover] = useState(false);
      return h(
        'button',
        {
          type: 'button',
          onClick: () => store.toggle(),
          title: '⌘K / Ctrl+K',
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            padding: '7px 9px',
            boxSizing: 'border-box',
            border: '1px solid ' + (hover ? mix(C.lineStrong, 72) : mix(C.lineStrong, 45)),
            borderRadius: 9,
            background: hover ? mix(C.layerAlt, 80) : 'transparent',
            color: hover ? C.text : C.sub,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'inherit',
            textAlign: 'left',
            transition: 'background 120ms ease, border-color 120ms ease, color 120ms ease',
          },
        },
        h(Icon, { name: 'search', size: 14 }),
        h(
          'span',
          { style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
          t.footer || '搜索',
        ),
        h(Kbd, null, '⌘K'),
      );
    }

    // ---------------------------------------------------------------------
    // registration
    // ---------------------------------------------------------------------
    var inject = ['slots', 'sessions', 'uiWorkspace', 'workspaces', 'theme', 'locale'];

    var hotkey = false;

    function onKey(event) {
      var mod = event.metaKey || event.ctrlKey;
      if (!mod || event.altKey) return;
      if (String(event.key || '').toLowerCase() !== 'k') return;
      event.preventDefault();
      event.stopPropagation();
      store.toggle();
    }

    function apply(ctx) {
      var overlay = ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register({ name: 'shell.overlay', id: 'dsh-cmdk-panel', order: 500 }, () =>
          h(Palette, { ctx: ctx }),
        ),
      );
      var button = ctx.slots.inject('sidebar.footer.action', () =>
        ctx.slots.register({ name: 'sidebar.footer.action', id: 'dsh-cmdk-button', order: 40 }, () =>
          h(FooterButton, { ctx: ctx }),
        ),
      );
      window.addEventListener('keydown', onKey, true);
      hotkey = true;

      // Extension point: another plugin can contribute rows.
      //   window.__DSH_CMDK__.register({ id, title, sub, run(ctx) })
      var api = {
        version: 1,
        register: registerCommand,
        unregister: unregisterCommand,
        open: () => store.set(true),
        close: () => store.set(false),
      };
      window.__DSH_CMDK__ = api;
      function onExternal(event) {
        if (event && event.detail) registerCommand(event.detail);
      }
      window.addEventListener('dsh-cmdk:command', onExternal);

      return () => {
        if (typeof overlay === 'function') overlay();
        if (typeof button === 'function') button();
        if (hotkey) window.removeEventListener('keydown', onKey, true);
        hotkey = false;
        window.removeEventListener('dsh-cmdk:command', onExternal);
        if (window.__DSH_CMDK__ === api) delete window.__DSH_CMDK__;
      };
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
