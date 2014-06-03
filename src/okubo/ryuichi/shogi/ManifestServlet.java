package okubo.ryuichi.shogi;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class ManifestServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		resp.setContentType("application/x-web-app-manifest+json");
	    resp.setCharacterEncoding("utf-8");
		
	    OutputStream out = resp.getOutputStream();
		FileInputStream in = new FileInputStream("manifest.webapp");
		byte[] buffer = new byte[4096];
		int length;
		while ((length = in.read(buffer)) > 0){
		    out.write(buffer, 0, length);
		}
    
	    in.close();
		out.flush();
	}
}
