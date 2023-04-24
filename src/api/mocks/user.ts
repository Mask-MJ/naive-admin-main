import { rest } from 'msw';
import { routers } from './router';

export const user = [
  rest.get('/basic-api/code', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        captchaOnOff: true,
        code: 200,
        img: `/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKD
        BQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zN
        DL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj
        IyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA8AKADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAA
        AAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhBy
        JxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ
        WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXG
        x8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAE
        CAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobH
        BCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0d
        XZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nn
        a4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0PwX4L8K3XgXw9cXHhrRpp5dMtnkkksImZ2
        MSkkkrkknnNbn/AAgng/8A6FTQ/wDwXQ//ABNHgT/knnhr/sFWv/opa6CgDn/+EE8H/wDQqaH/AOC6H/
        4mj/hBPB//AEKmh/8Aguh/+JroKKAOf/4QTwf/ANCpof8A4Lof/iaP+EE8H/8AQqaH/wCC6H/4mugo
        oA5//hBPB/8A0Kmh/wDguh/+Jo/4QTwf/wBCpof/AILof/ia6CkZgoyxAHvQBgf8IJ4P/wChU0P/AM
        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`,
        msg: '操作成功',
        uuid: 'e34b77db035e4fa3a367166d0f341956',
      }),
    );
  }),
  rest.post('/basic-api/system/token/login', async (req, res, ctx) => {
    const params = await req.json();
    if (params.username !== 'admin' || params.password !== 'admin123') {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          msg: '用户账号或密码错误',
          data: {
            errorMessage: '用户账号或密码错误',
          },
        }),
      );
    } else if (params.code !== '1') {
      return res(
        ctx.status(500),
        ctx.json({
          code: 500,
          msg: '验证码错误',
          data: {
            errorMessage: '验证码错误',
          },
        }),
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          msg: '操作成功',
          data: {
            access_token: 'asd',
            expires_in: '720',
          },
        }),
      );
    }
  }),
  rest.get('/basic-api/system/user/getInfo', (_req, res, ctx) => {
    const isAuthenticated = localStorage.getItem('TOKEN__');
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: '操作成功',
        permissions: ['*:*:*'],
        roles: ['admin'],
        user: {
          searchValue: null,
          createBy: 'admin',
          createTime: '2022-04-25 01:48:31',
          updateBy: null,
          updateTime: null,
          remark: '管理员',
          dataScope: null,
          userId: '1',
          deptId: null,
          userName: 'admin',
          nickName: 'NG',
          userType: '00',
          email: 's1378407107@163.com',
          phonenumber: '19157725784',
          sex: '0',
          avatar:
            'https://api.evmate.cn:11002/test-api/file/statics/2023/03/17/blob_20230317061000A181.png',
          password: '$2a$10$VZST/u6UJkfazI/fef6ES.J2.Tsf8fAPVaZiMrR5LPJMZDQQ1cpBq',
          status: '0',
          delFlag: '0',
          loginIp: '127.0.0.1',
          loginDate: '2022-04-25T01:48:31.000+08:00',
          dept: null,
          roles: [
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              dataScope: '1',
              roleId: '202',
              roleName: 'ddddd',
              roleKey: 'dasd',
              roleSort: 0,
              status: '0',
              delFlag: null,
              flag: false,
              menuIds: null,
              deptIds: null,
              beginTime: null,
              endTime: null,
              admin: false,
            },
          ],
          roleIds: null,
          postIds: null,
          roleId: null,
          beginTime: null,
          endTime: null,
          admin: true,
        },
      }),
    );
  }),
  rest.get('/basic-api/system/menu/getRouters', async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: '操作成功',
        data: routers,
      }),
    );
  }),
];
