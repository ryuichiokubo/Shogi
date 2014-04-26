package okubo.ryuichi.shogi;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class HomeServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		resp.setContentType("text/html");
	    resp.setCharacterEncoding("utf-8");
	}
}
