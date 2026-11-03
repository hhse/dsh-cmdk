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
      base: 'var(--dsw-alias-bg-base)',
      brand: 'var(--dsw-alias-brand-primary)',
      err: 'var(--dsw-alias-state-error-primary)',
      ok: 'var(--dsw-alias-state-success-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
    };

    var STRINGS = {
      zh: {
        placeholder: '搜索会话、工作区，或直接执行…',
        hint: '↑↓ 选择 · ↵ 执行 · → 更多动作 · esc 关闭',
        hintAction: '↵ 执行 · ← 返回 · esc 关闭',
        noResult: '没有匹配项',
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
        hint: '↑↓ move · ↵ run · → more actions · esc close',
        hintAction: '↵ run · ← back · esc close',
        noResult: 'No matches',
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
    // the palette itself
    // ---------------------------------------------------------------------
    function Palette(props) {
      var ctx = props.ctx;
      var lang = useLang(ctx);
      var t = copy(lang);
      var open = useOpen();
      var [query, setQuery] = useState('');
      var [catalog, setCatalog] = useState({ items: [], loading: false });
      var [index, setIndex] = useState(0);
      var [stack, setStack] = useState([]);
      var [input, setInput] = useState(null);
      var [status, setStatus] = useState(null);
      var [busy, setBusy] = useState(false);
      var inputRef = useRef(null);
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
          if (node && node.contains(event.target)) return;
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
            inputRef.current.focus();
            inputRef.current.select && inputRef.current.select();
          }
        }, 30);
        return () => clearTimeout(handle);
      }, [open]);

      useEffect(() => {
        if (!open) return undefined;
        var handle = setTimeout(() => {
          var node = inputRef.current;
          if (node && typeof node.focus === 'function') node.focus();
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
        store.set(false);
      }

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
        setStack((prev) => prev.concat([{ title: entry.title, items: entry.actions() }]));
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


      var rows = [];
      var lastGroup = null;
      items.forEach((entry, position) => {
        if (entry.group !== lastGroup) {
          lastGroup = entry.group;
          rows.push(
            h(
              'div',
              {
                key: 'group:' + entry.group + ':' + position,
                style: {
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  padding: '10px 14px 6px',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.02em',
                  color: C.sub,
                  textTransform: 'uppercase',
                  background: C.layer,
                },
              },
              groupLabel(entry.group, lang),
            ),
          );
        }
        rows.push(renderRow(
          entry,
          position === active,
          () => run(entry),
          () => openActions(entry),
          () => setIndex(position),
        ));
      });

      var tree = h(
        'div',
        {
          style: {
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'color-mix(in srgb, #000 28%, transparent)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '12vh',
          },
          onMouseDown: (event) => {
            if (event.target === event.currentTarget) close();
          },
        },
        h(
          'div',
          {
            role: 'dialog',
            'aria-label': 'Command palette',
            ref: panelRef,
            tabIndex: -1,
            onKeyDown: onKeyDown,
            style: {
              width: 'min(640px, calc(100vw - 48px))',
              maxHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              background: C.layer,
              color: C.text,
              border: '1px solid ' + C.lineStrong,
              borderRadius: 14,
              boxShadow: '0 24px 64px rgba(0,0,0,.34)',
              overflow: 'hidden',
              fontFamily: 'inherit',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                background: C.layerAlt,
                borderBottom: '1px solid ' + C.lineStrong,
                boxShadow: '0 8px 16px -18px rgba(0,0,0,.9)',
              },
            },
            current || input
              ? h(
                  'button',
                  {
                    type: 'button',
                    'aria-label': 'back',
                    onClick: () => {
                      if (input) {
                        setInput(null);
                        return;
                      }
                      setStack((prev) => prev.slice(0, -1));
                      setIndex(0);
                    },
                    style: {
                      border: 'none',
                      background: 'transparent',
                      color: C.sub,
                      cursor: 'pointer',
                      fontSize: 14,
                      padding: '0 2px',
                    },
                  },
                  '←',
                )
              : h('span', { style: { color: C.sub, fontSize: 13, fontFamily: MONO } }, '⌘K'),
            current && !input
              ? h(
                  'div',
                  {
                    style: {
                      flex: 1,
                      minWidth: 0,
                      fontSize: 14,
                      color: C.text,
                      padding: '7px 10px',
                      borderRadius: 9,
                      background: C.base,
                      border: '1px solid ' + C.lineStrong,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  },
                  current.title,
                )
              : h('input', {
                  ref: inputRef,
                  value: input ? input.value : query,
                  placeholder: input ? input.title : t.placeholder,
                  onChange: (event) => {
                    if (input) setInput(Object.assign({}, input, { value: event.target.value }));
                    else {
                      setQuery(event.target.value);
                      setIndex(0);
                    }
                  },
                  style: {
                    flex: 1,
                    minWidth: 0,
                    border: '1px solid ' + C.lineStrong,
                    borderRadius: 9,
                    outline: 'none',
                    background: C.base,
                    color: C.text,
                    fontSize: 15,
                    padding: '7px 10px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.18)',
                  },
                }),
          ),
          h(
            'div',
            {
              style: {
                overflowY: 'auto',
                flex: 1,
                minHeight: 0,
                padding: '6px 0 8px',
                background: C.layer,
              },
            },
            input ? null : items.length ? rows : h(
              'div',
              { style: { padding: '18px 16px', color: C.sub, fontSize: 13 } },
              catalog.loading ? t.searching : t.noResult,
            ),
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
                background: C.layerAlt,
                borderTop: '1px solid ' + C.lineStrong,
                fontSize: 11,
                color: C.sub,
              },
            },
            h('span', null, status || (busy ? t.searching : current ? t.hintAction : t.hint)),
          ),
        ),
      );
      return tree;
    }

    function renderRow(entry, active, onRun, onActions, onHover) {
      return h(
        'div',
        {
          key: entry.key,
          role: 'option',
          'aria-selected': active ? 'true' : 'false',
          onClick: onRun,
          onMouseEnter: onHover,
          onDoubleClick: onActions,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 14px',
            cursor: 'pointer',
            background: active ? C.layerAlt : 'transparent',
            boxShadow: active ? 'inset 2px 0 0 ' + C.brand : 'none',
          },
        },
        entry.dot
          ? h('span', {
              style: {
                flex: '0 0 auto',
                width: 6,
                height: 6,
                borderRadius: 3,
                background: entry.dot,
                opacity: 0.9,
              },
            })
          : null,
        h(
          'div',
          { style: { minWidth: 0, flex: 1 } },
          h(
            'div',
            {
              style: {
                fontSize: 13.5,
                color: C.text,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            },
            entry.title,
          ),
          entry.sub
            ? h(
                'div',
                {
                  style: {
                    fontSize: 11.5,
                    color: C.sub,
                    marginTop: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                },
                entry.sub,
              )
            : null,
        ),
        entry.actions
          ? h(
              'span',
              {
                title: 'actions',
                onClick: (event) => {
                  event.stopPropagation();
                  onActions();
                },
                style: {
                  flex: '0 0 auto',
                  padding: '0 4px',
                  color: C.sub,
                  fontSize: 13,
                  opacity: active ? 1 : 0.5,
                  cursor: 'pointer',
                },
              },
              '…',
            )
          : null,
        active ? h('span', { style: { fontSize: 11, color: C.sub, fontFamily: MONO } }, '↵') : null,
      );
    }

    function FooterButton(props) {
      var lang = useLang(props.ctx);
      var t = copy(lang);
      return h(
        'button',
        {
          type: 'button',
          onClick: () => store.toggle(),
          title: '⌘K / Ctrl+K',
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            width: '100%',
            padding: '6px 8px',
            border: 'none',
            borderRadius: 8,
            background: 'transparent',
            color: C.sub,
            cursor: 'pointer',
            fontSize: 12,
            textAlign: 'left',
          },
          onMouseEnter: (event) => {
            event.currentTarget.style.background = C.layerAlt;
          },
          onMouseLeave: (event) => {
            event.currentTarget.style.background = 'transparent';
          },
        },
        h('span', { style: { fontFamily: MONO, fontSize: 11, opacity: 0.8 } }, '⌘K'),
        h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, t.footer || '搜索'),
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
